const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Get the client
const mysql = require('mysql2');
const multer = require('multer');
// ใช้ middleware
app.use(bodyParser.json()); // สำหรับ JSON
app.use(bodyParser.urlencoded({ extended: true })); // สำหรับ URL encoded

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'nbdb',
});

app.use(cors())
app.use(bodyParser.json())

app.get('/api/officer', function (req, res, next) {
  // A simple SELECT query
  connection.query(
    'SELECT * FROM `officer` LIMIT 0, 10',
    function (err, data, fields) {
      console.log(data); // results contains rows returned by server
      res.json({data: data})
    }
  ); 
  
})


/**********************Login******************************************/
app.use(express.json());

app.get('/login', (req, res) => {
  const { stu_email, stu_id } = req.query;  // รับค่าจาก URL query string

  // ตรวจสอบว่าข้อมูลถูกส่งมาครบหรือไม่
  if (!stu_email & !stu_id) {
    return res.status(400).json({ error: 'กรุณาระบุอีเมลและรหัสนักศึกษา' });
  }

  // ค้นหาข้อมูลในฐานข้อมูล
  const query = `SELECT * FROM studentdetail WHERE stu_email = ? AND stu_id = ?`;
  const values = [stu_email, stu_id];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }

    // ตรวจสอบว่าพบข้อมูลในฐานข้อมูลหรือไม่
    if (result.length === 0) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสนักศึกษาไม่ถูกต้อง' });
    }
    console.log('เข้าสู่ระบบสำเร็จ');
    // ถ้าข้อมูลถูกต้องให้ทำการเปลี่ยนพาทไปที่ StuHome พร้อมส่ง stu_id
    //res.redirect(`/StuHome?stu_id=${stu_id}`);
    res.status(200).json({ 
      message: 'เข้าสู่ระบบสำเร็จ ', 
      redirectUrls: [
        `http://localhost:3000/StuHome?stu_id=${stu_id}`,
        `http://localhost:3000/request?stu_id=${stu_id}&stu_email=${stu_email}`
      ]
    });
    
  });
});




/***********************student page1***********************/

app.get('/StuHome', (req, res) => {
  const faculty_name = req.query.faculty_name;
  const stu_id = req.query.stu_id;

  // ตรวจสอบว่ามีการส่ง faculty_name และ stu_id มาหรือไม่
  if (!faculty_name && !stu_id) {
    res.status(400).send('กรุณาระบุชื่อหน่วยงานและรหัสนักศึกษา');
    return;
  }

  // Query ดึงข้อมูลจากตาราง faculty
  const facultyQuery = `SELECT f.faculty_name, f.number 
    FROM faculty f
    WHERE faculty_name LIKE ?`;
  const facultyValues = [`%${faculty_name}%`];

  connection.query(facultyQuery, facultyValues, (err, facultyData) => {
    if (err) {
      console.error('Error executing faculty query:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Query ดึงข้อมูลจากตาราง studentdetail
    const studentQuery = `SELECT stu_fname, stu_lname FROM studentdetail WHERE stu_id = ?`;
    const studentValues = [stu_id];

    connection.query(studentQuery, studentValues, (err, studentData) => {
      if (err) {
        console.error('Error executing student query:', err);
        return res.status(500).send('Internal Server Error');
      }

      // ส่งข้อมูล faculty และ student กลับไปพร้อมกัน
      res.json({
        faculty: facultyData,
        students: studentData
      });
    });
  });
});
  

/*****************************ส่งคำร้อง*********************************/

  /*
  //ส่งstu_phoneไปอัพเดตที่ studentdetail

  //ส่ง document && !witness && !borrow_date ไปเพิ่มใน borrow 

  //massage บอกว่าบันทึกสำเร็จ
*/
const path = require('path');
// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // สำหรับเข้าถึงไฟล์ที่อัพโหลด


// การตั้งค่า Multer สำหรับการอัพโหลดไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // เก็บชื่อไฟล์เป็น timestamp
  }
});
const upload = multer({ storage: storage });

// API Endpoint
app.post('/borrow', upload.single('document'), (req, res) => {
  const { stu_id, stu_phone, witness, borrow_date } = req.body;
  const document = req.file ? req.file.filename : null;

  // อัพเดตเบอร์โทรศัพท์ในตาราง student
  const updateQuery = 'UPDATE studentdetail SET stu_phone = ? WHERE stu_id = ?';
  connection.query(updateQuery, [stu_phone, stu_id], (err, result) => {
      if (err) return res.status(500).send(err);

        // ค้นหา stu_no จาก studentdetail โดยใช้ stu_id
        const selectStudentQuery = 'SELECT stu_no FROM studentdetail WHERE stu_id = ?'; // ค้นหา stu_no
        connection.query(selectStudentQuery, [stu_id], (err, studentResult) => {
            if (err) return res.status(500).send(err);
            if (studentResult.length === 0) {
                return res.status(400).send('Student ID not found in studentdetail');
            }

            const stu_no = studentResult[0].stu_no; // ใช้ stu_no ที่ค้นพบ

           
            connection.query(selectLabtopQuery, (err, labtopResult) => {
                if (err) return res.status(500).send(err);

                if (labtopResult.length === 0) {
                    return res.status(400).send('No labtop found');
                }

                const barcode_id = labtopResult[0].barcode_id; // ใช้ officer_id แรกที่เลือกมา

		            // เลือก officer_id อัตโนมัติ (ตัวอย่าง: เลือก officer แรกในฐานข้อมูล)
                const selectOfficerQuery = 'SELECT officer_id FROM officer LIMIT 1'; // เปลี่ยนตามเงื่อนไขที่ต้องการ
                connection.query(selectOfficerQuery, (err, officerResult) => {
                    if (err) return res.status(500).send(err);

                    if (officerResult.length === 0) {
                        return res.status(400).send('No officers found');
                    }

                    const officer_id = officerResult[0].officer_id; // ใช้ officer_id แรกที่เลือกมา

                    // เพิ่มข้อมูลในตาราง borrow โดยใช้ stu_no
                    const insertQuery = 'INSERT INTO borrow (stu_id, witness, borrow_date, document, officer_officer_id, barcode_id) VALUES (?, ?, ?, ?, ?,?)';
                    connection.query(insertQuery, [stu_no, witness, borrow_date, document, officer_id, barcode_id], (err, result) => {
                        if (err) return res.status(500).send(err);
                        res.status(201).send('Data inserted successfully');
                    });
              });
            });
                
        });
    });
});



/****************************ประวัติการยื่น***************************/
app.get('/reqHistory', function (req, res, next) {
  // A simple SELECT query
  connection.query(
    'SELECT * FROM `borrow`',
    function (err, data, fields) {
      console.log(data); // results contains rows returned by server
      res.json({data: data})
    }
  ); 
  
})

/***************************notebook model**********************/

const bwipjs = require('bwip-js');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');


app.post('/nbModel', function (req, res, next) {
  console.log(req.body); // ตรวจสอบค่าที่เข้ามา
  const { brand, model, serial_number, processor, ram_size, storage_size, storage_type, gpu, display_size, os, insurance_date, warranty_expiry_date, price, number } = req.body; // ใช้ req.body แทน req.query
  
  // ค่าเริ่มต้นของ status
  const status = 'ว่างใช้งานได้';

  // ตรวจสอบค่าของ number
  if (!number || number <= 0) {
    return res.status(400).send('The number must be greater than 0.');
  }


// Function สำหรับสร้างบาร์โค้ดและรูปภาพ
const generateBarcode = (barcode_id) => {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer({
      bcid: 'code128',  // ชนิดของบาร์โค้ด
      text: barcode_id, // ข้อความบาร์โค้ด
      scale: 3,         // ขนาด
      height: 10,       // ความสูง
      includetext: true,
      textxalign: 'center',
    }, function (err, png) {
      if (err) {
        reject(err);
      } else {
        // แปลงภาพจาก PNG เป็น JPG โดยใช้ sharp
        sharp(png)
          .jpeg() // แปลงเป็น JPG
          .toBuffer((err, jpgBuffer) => {
            if (err) {
              reject(err);
            } else {
              // แปลงเป็น Base64 URI
              const base64Image = jpgBuffer.toString('base64');
              const imageDataUri = `data:image/jpeg;base64,${base64Image}`;
              resolve(imageDataUri); // ส่งคืนรูปภาพในรูปแบบ Base64 URI
            }
          });
      }
    });
  });
};
// สร้างรายการบาร์โค้ด
const createBarcodes = async () => {
  const values = []; 
  const barcodeIds = new Set(); 

  for (let i = 0; i < number; i++) {// ตรวจสอบให้ครบจำนวนที่ต้องการ
    // สร้าง barcode_id 13 หลัก
    let barcode_id = '';
    for (let i = 0; i < 13; i++) {
      barcode_id += Math.floor(Math.random() * 10).toString(); // สุ่มเลข 0-9
    } 

    // ตรวจสอบว่า barcode_id ไม่ซ้ำกัน
    if (!barcodeIds.has(barcode_id)) {
      barcodeIds.add(barcode_id); 

      // สร้าง laptop_tag โดยใช้ลำดับที่ (i + 1) เพื่อให้เริ่มต้นจาก 001
      const laptop_tag = `NBKKU${(i + 1).toString().padStart(3, '0')}`; // เช่น NBKKU001, NBKKU002...

      const barcode_img = await generateBarcode(barcode_id);


      values.push(`('${barcode_id}', '${laptop_tag}', '${brand}', '${model}', '${serial_number}', '${processor}', '${ram_size}', '${storage_size}', '${storage_type}', '${gpu}', '${display_size}', '${os}', '${insurance_date}', '${warranty_expiry_date}', '${price}', '${barcode_img}', '${status}', '${number}')`);
    }
  }
  
  return values;    
};



  // ดำเนินการสร้างบาร์โค้ด
  createBarcodes().then((valuesArray) => {
    if (valuesArray.length === 0) {
      return res.status(400).send('No barcodes generated.');
    }
    
    // สร้างคำสั่ง SQL แบบ dynamic ที่มีหลายรายการ
    const valuesString = valuesArray.join(',');
    const insertLaptopQuery = `INSERT INTO laptop (barcode_id, laptop_tag, brand, model, serial_number, processor, ram_size, storage_size, storage_type, gpu, display_size, os, insurance_date, warranty_expiry_date, price, barcode_img, status, number) VALUES ${valuesString}`;

    // Debugging: ตรวจสอบคำสั่ง SQL ก่อนส่ง
    console.log(insertLaptopQuery); // ดูคำสั่ง SQL ที่สร้างขึ้น

    connection.query(insertLaptopQuery, (err, result) => {
      if (err) {
        console.error('SQL Error:', err); // แสดงข้อผิดพลาด
        return res.status(500).send(err);
      }

      // ส่งผลลัพธ์กลับในรูปแบบ JSON
      connection.query('SELECT * FROM laptop ORDER BY laptop_tag ASC', (err, data, fields) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.json({ data: data }); // ส่งข้อมูลกลับในรูปแบบ JSON
      });
      
    });
  }).catch((error) => {
    res.status(500).send(`Error generating barcodes: ${error.message}`);
  });
});




app.listen(3000, function () {
  console.log('listen')
})




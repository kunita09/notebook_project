const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mysql2 = require('mysql2');
const mysql = require('mysql');
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
    'SELECT * FROM `officer` ',
    function (err, data, fields) {
      console.log(data); // results contains rows returned by server
      res.json({data: data})
    }
  ); 
  
})


/**********************Login******************************************/


app.use(express.json());

app.get('/login', (req, res) => {
  const { stu_email, password } = req.query; // รับค่าจาก URL query string

  // ตรวจสอบว่าข้อมูลถูกส่งมาครบหรือไม่
  if (!stu_email || !password) {
    return res.status(400).json({ error: 'กรุณาระบุอีเมลและรหัสนักศึกษา' });
  }

  // ค้นหาข้อมูลในฐานข้อมูล
  const query = `SELECT * FROM studentdetail WHERE stu_email = ? AND password = ?`;
  const values = [stu_email, password];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err.message); // แสดงข้อความผิดพลาด
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }

    // ตรวจสอบว่าพบข้อมูลในฐานข้อมูลหรือไม่
    if (result.length === 0) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสนักศึกษาไม่ถูกต้อง' });
    }

    // ถ้าข้อมูลถูกต้องให้ทำการเปลี่ยนพาทไปที่ StuHome พร้อมส่ง stu_id
    res.status(200).json({ 
      message: 'เข้าสู่ระบบสำเร็จ ', 
      redirectUrls: [
        `http://localhost:3000/StuHome?stu_email=${stu_email}`
      ]
    });
  });
});




/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     description: เข้าสู่ระบบโดยใช้อีเมลและรหัสผ่านของนักศึกษา
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stu_email:
 *                 type: string
 *                 description: อีเมลนักศึกษา
 *               password:
 *                 type: string
 *                 description: รหัสผ่าน
 *             required:
 *               - stu_email
 *               - password
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 redirectUrls:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: URLs for redirecting
 *       400:
 *         description: Login fail due to missing or incorrect credentials
 *       500:
 *         description: Internal server error
 */




/***********************student page1***********************/

app.get('/StuHome', (req, res) => {
  const faculty_name = req.query.faculty_name;
  const stu_email = req.query.stu_email;

  // ตรวจสอบว่ามีการส่ง faculty_name และ stu_id มาหรือไม่
  if (!faculty_name && !stu_email) {
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
    const studentQuery = `SELECT stu_fname, stu_lname FROM studentdetail WHERE stu_email = ?`;
    const studentValues = [stu_email];

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

/**
 * @swagger
 * /StuHome:
 *   get:
 *     summary: Homepage of student
 *     description: Show faculty and student data
 *     parameters:
 *       - in: query
 *         name: faculty_name
 *         schema:
 *           type: string
 *         description: Name of faculty
 *         required: true
 *       - in: query
 *         name: stu_email
 *         schema:
 *           type: string
 *         description: Email of student
 *         required: true
 *     responses:
 *       200:
 *         description: Data retrieval success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 faculty:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       faculty_name:
 *                         type: string
 *                       number:
 *                         type: integer
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       stu_fname:
 *                         type: string
 *                       stu_lname:
 *                         type: string
 *       400:
 *         description: Missing faculty name or student email
 *       500:
 *         description: Internal server error
 */


/*****************************ส่งคำร้อง*********************************/

const path = require('path');
// Middleware
app.use(bodyParser.json());

// การตั้งค่า Multer สำหรับการอัปโหลดไฟล์โดยไม่ต้องบันทึกไฟล์ลงในระบบไฟล์
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API Endpoint
app.post('/borrow', upload.single('document'), (req, res) => {
  console.log(req.body);
  const stu_email = req.body.stu_email; 
  const { stu_phone, witness} = req.body;
  const document = req.file ? req.file.buffer : null;
  const borrow_date = new Date(); // เก็บเวลาปัจจุบัน

  console.log('Uploaded File:', req.file); // ตรวจสอบค่าที่ได้รับ
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  
  

    // อัพเดตเบอร์โทรศัพท์ในตาราง student
    const updateQuery = 'UPDATE studentdetail SET stu_phone = ? WHERE stu_email = ?';
    connection.query(updateQuery, [stu_phone, stu_email], (err, result) => {
        if (err) return res.status(500).send(err);
  
        // ค้นหา stu_no จาก studentdetail โดยใช้ stu_email
        const selectStudentQuery = 'SELECT stu_id, stu_fname, stu_lname, stu_faculty FROM studentdetail WHERE stu_email = ?';
        connection.query(selectStudentQuery, [stu_email], (err, studentResult) => {
            if (err) return res.status(500).send(err);
            if (studentResult.length === 0) {
                return res.status(400).send('Student ID not found in studentdetail');
            }

            const stu_id = studentResult[0].stu_id; // ดึงค่า stu_id จาก studentResult[0]
            
            // ตรวจสอบว่า stu_id ไม่เป็น NULL
            if (!stu_id) {
              return res.status(400).send('stu_id cannot be null');
            }


            // เลือก barcode_id จาก labtop ที่มี status = "ว่างใช้งาน"
            const selectLabtopQuery = 'SELECT barcode_id FROM laptop WHERE status = "ว่างพร้อมใช้งาน" LIMIT 1'; 
            connection.query(selectLabtopQuery, (err, labtopResult) => {
                if (err) return res.status(500).send(err);
  
                if (labtopResult.length === 0) {
                    return res.status(400).send('No laptop found');
                }

                const barcode_id = labtopResult[0].barcode_id; // เก็บ barcode_id ที่ได้
  
                // เลือก officer_id อัตโนมัติ (ตัวอย่าง: เลือก officer แรกในฐานข้อมูล)
                const selectOfficerQuery = 'SELECT officer_id FROM officer WHERE officer_id = 1'; 
                connection.query(selectOfficerQuery, (err, officerResult) => {
                    if (err) return res.status(500).send(err); // ส่งกลับข้อผิดพลาดหากเกิดข้อผิดพลาดในการค้นหา
                    if (officerResult.length === 0) {
                        return res.status(400).send('No officers found'); // ส่งกลับหากไม่พบข้อมูล
                    }

                    const officer_id = officerResult[0].officer_id; // ดึง officer_id จากผลลัพธ์
                    
                    // เพิ่มข้อมูลในตาราง borrow
                    const insertQuery = 'INSERT INTO borrow (stu_id, witness, borrow_date, document, officer_officer_id, barcode_id) VALUES (?, ?, ?, ?, ?, ?)';
                    connection.query(insertQuery, [stu_id, witness, borrow_date, document, officer_id, barcode_id], (err, result) => {
                        if (err) return res.status(500).send(err);
                         // เปลี่ยนเส้นทางไปยัง /reqHistory พร้อมส่ง stu_id ผ่าน query string
                        res.redirect(`http://localhost:3000/reqHistory?stu_id=${stu_id}`);
                    });

                });
            });
        });
    });
  });

  /**
 * @swagger
 * /borrow:
 *   post:
 *     summary: Create a new borrow
 *     description: Create a new borrow with the specified details
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               stu_email:
 *                 type: string
 *                 description: อีเมลนักศึกษา
 *               stu_phone:
 *                 type: string
 *                 description: เบอร์โทรศัพท์นักศึกษา
 *               witness:
 *                 type: string
 *                 description: รหัสนักศึกษาที่เป็นพยาน
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: ไฟล์เอกสาร
 *             required:
 *               - stu_email
 *               - stu_phone
 *               - witness
 *               - document
 *     responses:
 *       200:
 *         description: Borrow created successfully
 *       400:
 *         description: Bad request due to missing or invalid parameters
 *       500:
 *         description: Internal server error
 */


/****************************ประวัติการยื่น***************************/
app.get('/reqHistory', function (req, res, next) {
  const { stu_id } = req.query; 
  // A simple SELECT query
  const selectBorrowQuery = 'SELECT * FROM `borrow` WHERE stu_id = ?';
  connection.query(selectBorrowQuery, [stu_id], (err, BorrowResult) => {
    if (err) {
        return res.status(500).json({ error: 'Database query failed', details: err });
    }
    res.json({ BorrowResult: BorrowResult });
    
  }); 
  
})
/**
 * @swagger
 * /reqHistory:
 *   get:
 *     summary: Get history of borrowed items
 *     description: Retrieve the history of borrowed items for a specific student.
 *     parameters:
 *       - in: query
 *         name: stu_id
 *         required: true
 *         description: รหัสนักศึกษา
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: รายการประวัติการยืมที่เรียกคืนสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 BorrowResult:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       stu_id:
 *                         type: string
 *                         description: รหัสนักศึกษา
 *                       borrow_date:
 *                         type: string
 *                         format: date-time
 *                         description: วันที่ทำการยืม
 *                       document:
 *                         type: string
 *                         description: เอกสารที่แนบมาพร้อมกับการยืม
 *                       status:
 *                         type: string
 *                         description: สถานะการยืม
 *       400:
 *         description: Bad request due to missing or invalid parameters
 *       500:
 *         description: Internal server error
 */


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

/**
 * @swagger
 * /nbModel:
 *   post:
 *     summary: Add new laptop model
 *     description: Add a new laptop model to the database with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *                 description: ยี่ห้อของโน้ตบุ๊ก
 *               model:
 *                 type: string
 *                 description: รุ่นของโน้ตบุ๊ก
 *               serial_number:
 *                 type: string
 *                 description: หมายเลขเครื่องของโน้ตบุ๊ก
 *               processor:
 *                 type: string
 *                 description: ชนิดของโปรเซสเซอร์
 *               ram_size:
 *                 type: string
 *                 description: ขนาดของ RAM
 *               storage_size:
 *                 type: string
 *                 description: ขนาดของหน่วยเก็บข้อมูล
 *               storage_type:
 *                 type: string
 *                 description: ประเภทของหน่วยเก็บข้อมูล (HDD, SSD, etc.)
 *               gpu:
 *                 type: string
 *                 description: ชนิดของ GPU ที่ใช้
 *               display_size:
 *                 type: string
 *                 description: ขนาดหน้าจอของโน้ตบุ๊ก
 *               os:
 *                 type: string
 *                 description: ระบบปฏิบัติการที่ติดตั้งอยู่
 *               insurance_date:
 *                 type: string
 *                 format: date
 *                 description: วันที่เริ่มประกัน
 *               warranty_expiry_date:
 *                 type: string
 *                 format: date
 *                 description: วันที่หมดประกัน
 *               price:
 *                 type: string
 *                 description: ราคาของโน้ตบุ๊ก
 *               number:
 *                 type: integer
 *                 description: จำนวนโน้ตบุ๊กที่ต้องการเพิ่ม
 *             required:
 *               - brand
 *               - model
 *               - serial_number
 *               - storage_size
 *               - storage_type
 *               - gpu
 *               - display_size
 *               - os
 *               - insurance_date
 *               - warranty_expiry_date
 *               - price
 *               - number
 *     responses:
 *       200:
 *         description: Laptop model added successfully
 *       400:
 *         description: Bad request due to missing or invalid parameters
 *       500:
 *         description: Internal server error
 */



/****************************************รับคำร้อง******************************************** */
// ดึงข้อมูลนักศึกษาในตาราง borrow
app.route('/ApproveRequest/:stu_id')
    // GET: ดึงข้อมูลของนักศึกษาและการยืม
    .get((req, res) => {
        const { stu_id } = req.params; // ดึง stu_id จาก parameters
        const selectQuery = `
            SELECT 
                sd.stu_fname,
                sd.stu_lname,
                sd.stu_faculty,
                b.*
            FROM 
                studentdetail sd
            JOIN 
                borrow b ON sd.stu_id = b.stu_id
            WHERE 
                sd.stu_id = ?
        `;

        connection.query(selectQuery, [stu_id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed', details: err });
            }
            if (results.length === 0) {
                return res.status(400).send('No borrow requests found for this student');
            }
            res.json({ borrowRequests: results }); // ส่งผลลัพธ์กลับ
        });
    })

    // PUT: อัพเดตข้อมูลการยืม
    .put((req, res) => {
      const { stu_id } = req.params; // ดึง stu_id จาก parameters
      const { renew_date, return_date, status } = req.body; // ดึงข้อมูลที่ต้องการอัพเดต
  
      // แสดงข้อมูลที่ได้รับจาก req.body และ req.params
      console.log('Request Body:', req.body);
      console.log('stu_id:', stu_id);
  
      const updateQuery = `
          UPDATE borrow 
          SET renew_date = ?, return_date = ?, status = ?
          WHERE stu_id = ?
      `;
  
      connection.query(updateQuery, [renew_date, return_date, status, stu_id], (err, result) => {
          if (err) {
              return res.status(500).json({ error: 'Database update failed', details: err });
          }
          console.log('Update Result:', result); // ตรวจสอบผลลัพธ์ของการ Query
          res.status(200).send('Borrow request updated successfully');
      });
  })
  

    // DELETE: ลบข้อมูลการยืม
    .delete((req, res) => {
        const { stu_id } = req.params; // ดึง stu_id จาก parameters

        const deleteQuery = 'DELETE FROM borrow WHERE stu_id = ?';

        connection.query(deleteQuery, [stu_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database delete failed', details: err });
            }
            res.status(200).send('Borrow request deleted successfully');
        });
    });



//swagger
const swaggerUiOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Borrow API',
      version: '1.0.0',
      description: 'API for managing borrow notebook',
    },
    servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  },
  apis: ['./server.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerUiOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




app.listen(3000, function () {
  console.log('listen')
})




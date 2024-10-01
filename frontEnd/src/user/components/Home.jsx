import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // นำเข้า useLocation
import Slidebar from './Sidebar';
import Nav from './Nav';

function Home() {
  const location = useLocation(); // ใช้ useLocation เพื่อเข้าถึง location object
  const [faculty_name, setFacultyName] = useState('');
  const [stu_email, setStuEmail] = useState(''); // กำหนดค่าเริ่มต้นสำหรับ stuEmail
  const [facultyData, setFacultyData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // ดึง stu_email จาก URL query string
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('stu_email');
    if (email) {
      setStuEmail(email); // ตั้งค่า stuEmail
    }
  }, [location]);

  const handleSearch = async () => {
    if (!faculty_name) {
      setError('กรุณากรอกชื่อคณะและอีเมลนักศึกษา');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/StuHome?stu_email=${stu_email}&faculty_name=${faculty_name}`
      );

      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
      }

      const data = await response.json();
      setFacultyData(data.faculty);
      setStudentData(data.students);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-LightGray">
      <Nav />
      <div className="flex flex-1">
        <Slidebar />
        <div className="flex-1 p-12">
          <div className="flex justify-center items-start mt-12">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
              <h1 className="text-3xl mb-6 text-center font-sans text-KKU">ตรวจสอบ</h1>

              {/* Search Section */}
              <div className="flex items-center justify-center mb-10">
                <input
                  type="text"
                  placeholder="Faculty Name"
                  className="p-3 border border-gray-300 rounded-lg mr-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={faculty_name} // แก้ไขให้เป็น facultyName
                  onChange={(e) => setFacultyName(e.target.value)} // อัปเดตค่า facultyName ใน state
                />
                {/* <input
                  type="email"
                  placeholder="Student Email"
                  className="p-3 border border-gray-300 rounded-lg mr-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={stu_email} // เชื่อมต่อกับ stuEmail ใน state
                  onChange={(e) => setStuEmail(e.target.value)} // อัปเดตค่า stuEmail ใน state
                /> */}
                <button
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-center">{error}</p>}

              {/* Table Section */}
              <div className="overflow-x-auto rounded-lg shadow-sm">
                <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-KKU from-blue-500 to-blue-700 text-white">
                      <th className="px-6 py-4 text-left font-semibold">ลำดับ</th>
                      <th className="px-6 py-4 text-left font-semibold">รายชื่อคณะ</th>
                      <th className="px-6 py-4 text-left font-semibold">จำนวนโน๊ตบุ๊ค</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyData.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center px-6 py-4">ไม่มีข้อมูล</td>
                      </tr>
                    ) : (
                      facultyData.map((faculty, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">{faculty.faculty_name}</td>
                          <td className="px-6 py-4">{faculty.number}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Student Information Section */}
              {/* <div className="mt-8">
                <h2 className="text-xl font-bold">ข้อมูลนักศึกษา</h2>
                <ul>
                  {studentData.length === 0 ? (
                    <li>ไม่มีข้อมูลนักศึกษา</li>
                  ) : (
                    studentData.map((student, index) => (
                      <li key={index}>{student.stu_fname} {student.stu_lname}</li>
                    ))
                  )}
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

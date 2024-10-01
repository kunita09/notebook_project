import React, { useState } from 'react';
import Nav from './Nav';
import Slidebar from './Sidebar';


function Form() {

    // ใช้ useState เพื่อจัดเก็บค่าเบอร์โทรศัพท์
    const [phoneNumber, setPhoneNumber] = useState('');

    // ฟังก์ชันจัดการการเปลี่ยนแปลงของฟิลด์เบอร์โทรศัพท์
    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;

        // อนุญาตเฉพาะตัวเลขและจำกัดความยาวไม่เกิน 10 หลัก
        if (/^0\d{0,10}$/.test(input)) {
            setPhoneNumber(input);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // การประมวลผลข้อมูลที่ได้รับรวมถึงไฟล์ที่อัปโหลด
        if (file) {
            // ทำการบันทึกหรือประมวลผลไฟล์ที่เลือก
            console.log('ไฟล์ที่อัปโหลด:', file.name);
        } else {
            console.log('ไม่มีไฟล์ที่อัปโหลด');
        }
    };


    return (
        <div className="flex bg-LightGray flex-col min-h-screen">
            <Nav />
            <div className="flex flex-1">
                <Slidebar />
                <div className="flex-1 p-12">
                    <div className="flex justify-center items-start mt-12 ">

                        <div className="w-full max-w-5xl ">  {/* ขนาดกรอบ */}
<<<<<<< HEAD
                            
                            <h1 className="text-3xl  mb-6 text-center font-sans text-KKU">ส่งคำร้องขอยื่นโน๊ตบุ๊ค</h1>
=======

                            <h1 className="text-3xl  mb-6 text-center font-sans text-KKU">ส่งคำร้องขอยืมโน๊ตบุ๊ค</h1>
>>>>>>> 48db2e4de287f3c3de6eded6cf39f736e2d3fa35

                            {/* กรอบสำหรับกรอกข้อมูล */}
                            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg ">
                                <h2 className="text-xl font-sans mb-4">ข้อมูลส่วนตัว</h2>

                                <form>
                                    {/* ช่องกรอกข้อมูลสองช่องในบรรทัดเดียว */}
                                    <div className="flex space-x-4 mb-4">
                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="Name">
                                                ชื่อ - นามสกุล :
                                            </label>
                                            <input
                                                id="Name"
                                                type="text"
                                                placeholder="กรอกชื่อจริง"
                                                className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                                            //type="text"  กำหนด type เป็น text สำหรับรหัสนักศึกษา
                                            //value={studentId}  กำหนด value จาก useState
                                            //onChange={handleStudentIdChange}  เรียกฟังก์ชันเมื่อมีการเปลี่ยนแปลง
                                            />
                                        </div>

                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="Student ID">
                                                รหัสนักศึกษา :
                                            </label>
                                            <input
                                                id="Student ID"
                                                type="text"
                                                placeholder="กรอกรหัส"
                                                className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // กำหนดความกว้างสูงสุดที่ max-w-md (28rem) หรือสามารถเปลี่ยนเป็นค่าที่ต้องการ

                                            />
                                        </div>
                                    </div>

                                    <div className="w-1/2 mb-4">
                                        <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="Student ID">
                                            หน่วยงาน / สำนักวิชา :
                                        </label>
                                        <input
                                            id="Student ID"
                                            type="text"
                                            placeholder="คณะ"
                                            className="w-500 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                                        />
                                    </div>


                                    {/* ช่องสำหรับเบอร์ และ เลือกวันเดือนปี  */}

                                    <div className="flex space-x-4 mb-4">
                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="phoneNumber">
                                                เบอร์โทรศัพท์ :
                                            </label>

                                            <input
                                                id="phoneNumber"
                                                type="text"
                                                placeholder="เบอร์โทร"
                                                value={phoneNumber}
                                                onChange={handlePhoneNumberChange}
                                                maxLength="10" // จำกัดความยาวที่ 10 ตัวอักษร
                                                className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <label className="mt-2 block text-red-700 font-sans mb-1" htmlFor="phoneNumber" style={{ fontSize: '12px' }}  >
                                                * เบอร์โทรศัพท์ที่สามารถติดต่อได้
                                            </label>
                                        </div>

                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="dob">
                                                วัน/เดือน/ปี ส่งคำร้องขอยืน :
                                            </label>
                                            <input
                                                id="dob"
                                                type="date"
                                                className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* เส้นกันสีเทา */}
                                    <div className="h-4 border-t-2 border-gray-300 mt-6"></div>

                                    {/* ข้อมูลพยายาน */}
                                    <h2 className="text-xl font-sans mb-4">ข้อมูลพยาน</h2>
                                    <div className="flex space-x-4 mb-4">
                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="Name">
                                                ชื่อ - นามสกุล :
                                            </label>
                                            <input
                                                id="Name"
                                                type="text"
                                                placeholder="กรอกชื่อจริง"
                                                className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                                            //type="text"  กำหนด type เป็น text สำหรับรหัสนักศึกษา
                                            //value={studentId}  กำหนด value จาก useState
                                            //onChange={handleStudentIdChange}  เรียกฟังก์ชันเมื่อมีการเปลี่ยนแปลง
                                            />
                                        </div>

                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="Student ID">
                                                รหัสนักศึกษา :
                                            </label>
                                            <input
                                                id="Student ID"
                                                type="text"
                                                placeholder="กรอกรหัส"
                                                className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // กำหนดความกว้างสูงสุดที่ max-w-md (28rem) หรือสามารถเปลี่ยนเป็นค่าที่ต้องการ

                                            />
                                        </div>
                                    </div>


                                    {/* ช่องสำหรับเบอร์ และ เลือกวันเดือนปี  */}
                                    <div className="flex space-x-4 mb-4">

                                        <div className="w-1/2 mb-4">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="Student ID">
                                                หน่วยงาน / สำนักวิชา :
                                            </label>
                                            <input
                                                id="Student ID"
                                                type="text"
                                                placeholder="คณะ"
                                                className="w-500 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                                            />
                                        </div>

                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="phoneNumber">
                                                เบอร์โทรศัพท์ :
                                            </label>

                                            <input
                                                id="phoneNumber"
                                                type="text"
                                                placeholder="เบอร์โทร"
                                                value={phoneNumber}
                                                onChange={handlePhoneNumberChange}
                                                maxLength="10" // จำกัดความยาวที่ 10 ตัวอักษร
                                                className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <label className="mt-2 block text-red-700 font-sans mb-1" style={{ fontSize: '12px' }}  >
                                                * เบอร์โทรศัพท์ที่สามารถติดต่อได้
                                            </label>
                                        </div>


                                    </div>

                                    {/* เส้นกันสีเทา */}
                                    <div className="h-4 border-t-2 border-gray-300 mt-6"></div>

                                    {/* ช่องสำหรับอัปโหลดไฟล์ */}
                                    <div className="mb-4">
                                        <div className="flex flex-col items-start">
                                            <h2 className="text-xl font-sans mb-1">อัปโหลดเอกสาร</h2>
                                            <h3 className="text-red-700 font-sans" style={{ fontSize: '12px', marginTop: '0px' }}>
                                                * เลือกอัปโหลดเอกสารอย่างใดอย่างหนึ่ง
                                            </h3>
                                        </div>

                                        <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="fileUpload" style={{ marginTop: '20px' }}>
                                            ใบเสร็จชำระค่าเทอม :
                                        </label>
                                        <input
                                            id="fileUpload"
                                            type="file"
                                            accept=".pdf, .doc, .docx" // กำหนดประเภทไฟล์ที่อนุญาต
                                            onChange={handleFileChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="fileUpload" style={{ marginTop: '20px' }}>
                                            ใบผ่อนผันค่าเทอม :
                                        </label>
                                        <input
                                            id="fileUpload"
                                            type="file"
                                            accept=".pdf, .doc, .docx" // กำหนดประเภทไฟล์ที่อนุญาต
                                            onChange={handleFileChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <label className="mt-2 block text-red-700 font-sans mb-1" style={{ fontSize: '12px' }}  >
                                            * หน้าที่ขึ้นสถานะเสร็จเรียบร้อยเเล้ว
                                        </label>

                                        <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="fileUpload" style={{ marginTop: '20px' }}>
                                            ใบกยศ. :
                                        </label>
                                        <input
                                            id="fileUpload"
                                            type="file"
                                            accept=".pdf, .doc, .docx" // กำหนดประเภทไฟล์ที่อนุญาต
                                            onChange={handleFileChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <label className="mt-2 block text-red-700 font-sans mb-1" style={{ fontSize: '12px' }}  >
                                            * พยานเซ็นเรียบร้อยเเล้ว (ใบสีม่วง)
                                        </label>
                                    </div>

                                    <div className="flex justify-end mt-7">
<<<<<<< HEAD
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
                                        >
                                            ส่งคำร้อง
                                        </button>
                                    </div>
=======
                                        <button type="submit" className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
                                            ส่งคำร้องขอยืม
                                        </button>
                                    </div>

            
>>>>>>> 48db2e4de287f3c3de6eded6cf39f736e2d3fa35
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
import React from 'react';
import Navadmin from './Navadmin';
import Slidebaradmin from './Sideberadmin';

function AddDetails() {
    return (
        <div className="flex bg-LightGray flex-col min-h-screen">
            <Navadmin />
            <div className="flex flex-1">
                <Slidebaradmin />
                <div className="flex-1 p-12">
                    <div className="flex justify-center items-start mt-12 ">
                        <div className="w-full max-w-5xl ">
                            <h1 className="text-3xl mb-6 text-center font-sans text-blue">เพิ่มข้อมูลเครื่องโน๊ตบุ๊ค</h1>

                            {/* กรอบสำหรับกรอกข้อมูล */}
                            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg ">
                                <form >
                                    {/* ข้อมูลเครื่องโน๊ตบุ๊ค */}
                                    <h2 className="text-xl font-sans mb-4">ข้อมูลเครื่องโน๊ตบุ๊ค</h2>

                                    {/* ช่องกรอกข้อมูลสองช่องในบรรทัดเดียว */}
                                    <div className="flex space-x-4 mb-4">
                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="brand">
                                                ยี่ห้อโน๊ตบุ๊ค :
                                            </label>
                                            <input
                                                id="brand"
                                                name="brand"
                                                type="text"
                                                placeholder="กรอกยี่ห้อโน๊ตบุ๊ค"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required //บังคับกรอก
                                            />
                                        </div>

                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="model">
                                                รุ่นโน๊ตบุ๊ค :
                                            </label>
                                            <input
                                                id="model"
                                                name="model"
                                                type="text"
                                                placeholder="กรอกรุ่นโน๊ตบุ๊ค"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* ช่องกรอกซีเรียลและข้อมูลฮาร์ดแวร์ */}
                                    <div className="flex space-x-4 mb-4">
                                        <div className="w-1/3">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="serialNumber">
                                                หมายเลขซีเรียล :
                                            </label>
                                            <input
                                                id="serialNumber"
                                                name="serialNumber"
                                                type="text"
                                                placeholder="กรอกหมายเลขซีเรียล"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-1/3">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="cpu">
                                                ซีพียู (CPU) :
                                            </label>
                                            <input
                                                id="cpu"
                                                name="cpu"
                                                type="text"
                                                placeholder="กรอกข้อมูล CPU"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-1/3">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="ram">
                                                แรม (RAM) :
                                            </label>
                                            <input
                                                id="ram"
                                                name="ram"
                                                type="text"
                                                placeholder="กรอกข้อมูล RAM"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>


                                    {/* ช่องกรอกซีเรียลและข้อมูลฮาร์ดแวร์ */}
                                    <div className="flex space-x-4 mb-4">
                                        <div className="w-1/3">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="storage">
                                                การจัดเก็บข้อมูล (Storage) :
                                            </label>
                                            <input
                                                id="storage"
                                                name="storage"
                                                type="text"
                                                placeholder="กรอกข้อมูล Storage"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-1/3">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="Typestorage">
                                                ประเภทของหน่วยความจำ (TypeStorage) :
                                            </label>
                                            <input
                                                id="Typestorage"
                                                name="Typestorage"
                                                type="text"
                                                placeholder="กรอกข้อมูล TypeStorage"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-1/3">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="Operating system">
                                                ระบบปฎิบัติการ :
                                            </label>
                                            <input
                                                id="Operatingsystem"
                                                name="system"
                                                type="text"
                                                placeholder="กรอกข้อมูล ระบบปฎิบัติการ"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* ช่องกรอกการ์ดจอ ขนาดหน้าจอ และราคา */}
                                    <div className="flex space-x-4 mb-4">
                                        <div className="w-1/3">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="gpu">
                                                การ์ดจอ (GPU) :
                                            </label>
                                            <input
                                                id="gpu"
                                                name="gpu"
                                                type="text"
                                                placeholder="กรอกข้อมูลการ์ดจอ"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-1/3">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="screenSize">
                                                ขนาดหน้าจอ (Screen Size) :
                                            </label>
                                            <input
                                                id="screenSize"
                                                name="screenSize"
                                                type="text"
                                                placeholder="กรอกขนาดหน้าจอ"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-1/3">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="price">
                                                ราคา (Price) :
                                            </label>
                                            <input
                                                id="price"
                                                name="price"
                                                type="number"
                                                placeholder="กรอกราคา"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* เส้นกันสีเทา */}
                                    <div className="h-4 border-t-2 border-gray-300 mt-6"></div>

                                    {/* ช่องประกัน */}
                                    <div className="flex space-x-4 mb-4">
                                        {/* วันเริ่มประกัน */}
                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="insuranceStartDate">
                                                วันเริ่มประกัน :
                                            </label>
                                            <input
                                                id="insuranceStartDate"
                                                name="insuranceStartDate"
                                                type="date"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        {/* วันสิ้นสุดประกัน */}
                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="insuranceEndDate">
                                                วันสิ้นสุดประกัน :
                                            </label>
                                            <input
                                                id="insuranceEndDate"
                                                name="insuranceEndDate"
                                                type="date"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                     {/* วิธีการจัดซื้อ บริษัท */}
                                     <div className="flex space-x-4 mb-4">
                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="brand">
                                                วิธีการจัดซื้อ :
                                            </label>
                                            <input
                                                id="brand"
                                                name="brand"
                                                type="text"
                                                placeholder="กรอกยี่ห้อโน๊ตบุ๊ค"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required //บังคับกรอก
                                            />
                                        </div>

                                        <div className="w-1/2">
                                            <label className="block text-gray-700 font-sans text-sm mb-2" htmlFor="model">
                                                บริษัท :
                                            </label>
                                            <input
                                                id="model"
                                                name="model"
                                                type="text"
                                                placeholder="กรอกรุ่นโน๊ตบุ๊ค"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>


                                    {/* ปุ่มส่งฟอร์ม */}
                                    <div className="flex justify-end mt-7">
                                        <button type="submit" className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
                                            บันทึกข้อมูล
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDetails

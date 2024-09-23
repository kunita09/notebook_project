import React from 'react'
import Nav from './Nav'
import Slidebar from './Sidebar'

function Form() {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <div className="flex flex-1">
                <Slidebar />
                <div className="flex-1 p-12">
                    <div className="flex justify-center items-start mt-12">
                        <div className="w-full max-w-3xl">
                            <h1 className="text-3xl font-bold mb-6 text-center">ส่งคำร้องขอยื่นโน๊ตบุ๊ค</h1>

                            {/* กรอบสำหรับกรอกข้อมูล */}
                            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">ข้อมูลส่วนตัว</h2>

                                <form>
                                    {/* ช่องกรอกข้อมูลสองช่องในบรรทัดเดียว */}
                                    <div className="flex space-x-4 mb-4">
                                        <div className="w-1/2">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                                ชื่อจริง
                                            </label>
                                            <input
                                                id="firstName"
                                                type="text"
                                                placeholder="กรอกชื่อจริง"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="w-1/2">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                                นามสกุล
                                            </label>
                                            <input
                                                id="lastName"
                                                type="text"
                                                placeholder="กรอกนามสกุล"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* ช่องสำหรับเลือกวันเดือนปี */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                                            วัน/เดือน/ปีเกิด
                                        </label>
                                        <input
                                            id="dob"
                                            type="date"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                            อีเมล
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="กรอกอีเมลของคุณ"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                            เบอร์โทรศัพท์
                                        </label>
                                        <input
                                            id="phone"
                                            type="text"
                                            placeholder="กรอกเบอร์โทรศัพท์ของคุณ"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* เส้นแนวนอนที่ด้านล่างสุด */}
                                    <div className="border-t border-black mt-6"></div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                            เบอร์โทรศัพท์
                                        </label>
                                        <input
                                            id="phone"
                                            type="text"
                                            placeholder="กรอกเบอร์โทรศัพท์ของคุณ"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                            เบอร์โทรศัพท์
                                        </label>
                                        <input
                                            id="phone"
                                            type="text"
                                            placeholder="กรอกเบอร์โทรศัพท์ของคุณ"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>


                                    <div className="flex justify-end mt-7">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
                                        >
                                            ส่งคำร้อง
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

export default Form
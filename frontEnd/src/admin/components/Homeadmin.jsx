import React from 'react';
import Sideberadmin from './Sideberadmin';
import Navadmin from './Navadmin';

function Homeadmin() {
  return (
    <div className="flex flex-col min-h-screen bg-LightGray">
      <Navadmin />
      <div className="flex flex-1">
        <Sideberadmin />
        <div className="flex-1 p-12">

          <div className="flex justify-center items-start mt-12">

            <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-8">

              <h1 className="text-3xl  mb-6 text-center font-sans text-blue">คำร้องขอยื่น</h1>


              {/* Search Section */}
              <div className="flex items-center justify-center mb-10">
                <input
                  type="text"
                  placeholder="รหัสนักศึกษา..."
                  className="p-3 border border-gray-300 rounded-lg mr-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
                  Search
                </button>
              </div>

              {/* Table Section */}
              <div className="overflow-x-auto rounded-lg shadow-sm">
                <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-blue from-blue-500 to-blue-700 text-white">
                      <th className="px-4 py-2 text-left font-semibold">ลำดับ</th>
                      <th className="px-4 py-2 text-left font-semibold">รหัสนักศึกษา</th>
                      <th className="px-4 py-2 text-left font-semibold">ชื่อ-สกุล</th>
                      <th className="px-4 py-2 text-left font-semibold">คณะ</th>
                      <th className="px-4 py-2 text-left font-semibold">วันที่ยื่น</th>
                      <th className="px-4 py-2 text-left font-semibold">Email</th>
                      <th className="px-4 py-2 text-left font-semibold">เบอร์โทร</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 transition duration-200">
                      <td className="px-4 py-2">1</td>
                      <td className="px-4 py-2">643021222-5</td>
                      <td className="px-4 py-2">นางสาวโชติกา เอี่ยมสอาด</td>
                      <td className="px-4 py-2">วิทยาลัยการคอมพิวเตอร์</td>
                      <td className="px-4 py-2">1-10-2546</td>
                      <td className="px-4 py-2">chotika.@gmail.com</td>
                      <td className="px-4 py-2">098-456-1548</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homeadmin

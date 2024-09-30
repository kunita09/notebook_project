import React from 'react';
import Slidebar from './Sidebar';
import Nav from './Nav';

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-LightGray">
      <Nav />
      <div className="flex flex-1">
        <Slidebar />
        <div className="flex-1 p-12">
    
          <div className="flex justify-center items-start mt-12">

            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">

              <h1 className="text-3xl  mb-6 text-center font-sans text-KKU">ตรวจสอบ</h1>


              {/* Search Section */}
              <div className="flex items-center justify-center mb-10">
                <input
                  type="text"
                  placeholder="Search..."
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
                    <tr className="bg-KKU from-blue-500 to-blue-700 text-white">
                      <th className="px-6 py-4 text-left font-semibold">ลำดับ</th>
                      <th className="px-6 py-4 text-left font-semibold">รายชื่อคณะ</th>
                      <th className="px-6 py-4 text-left font-semibold">จำนวนโน๊ตบุ๊ค</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 transition duration-200">
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">John Doe</td>
                      <td className="px-6 py-4">john@example.com</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition duration-200">
                      <td className="px-6 py-4">2</td>
                      <td className="px-6 py-4">Jane Doe</td>
                      <td className="px-6 py-4">jane@example.com</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="px-6 py-4">3</td>
                      <td className="px-6 py-4">Alice</td>
                      <td className="px-6 py-4">alice@example.com</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition duration-200">
                      <td className="px-6 py-4">3</td>
                      <td className="px-6 py-4">Alice</td>
                      <td className="px-6 py-4">alice@example.com</td>
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

export default Home;

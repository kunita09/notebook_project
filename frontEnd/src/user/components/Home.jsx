import React from 'react';
import Slidebar from './Sidebar';
import Nav from './Nav';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex flex-1">
        <Slidebar />
        <div className="flex-1 p-12">
          <div className="flex justify-center items-start mt-12">
            <div className="w-full max-w-3xl">
              <h1 className="text-3xl font-bold mb-6 text-center">Home Page</h1>
              <div className="flex items-center justify-center mb-8">
                <input
                  type="text"
                  placeholder="Search..."
                  className="p-2 border border-gray-300 rounded-md mr-4 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                  Search
                </button>
              </div>

              {/* จัดตำแหน่งตารางให้อยู่ตรงกลางและตกแต่ง */}
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="px-6 py-3 text-left">ID</th>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">John Doe</td>
                      <td className="px-6 py-4">john@example.com</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="px-6 py-4">2</td>
                      <td className="px-6 py-4">Jane Doe</td>
                      <td className="px-6 py-4">jane@example.com</td>
                    </tr>
                    <tr className="hover:bg-gray-100">
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

export default Home

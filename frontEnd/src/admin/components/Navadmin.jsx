import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // นำเข้า Link

function Navadmin() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-LightGray text-white p-4 fixed top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Meb</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg">นางสาวคุณิตา นนทะชาติ</span>

          {/* กดแล้วเปิดดรอปดาวน์ */}
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <FontAwesomeIcon icon={faUserCircle} size="lg" />
         
              
            </button>

            {/* เมนูดรอปดาวน์ */}
            {isOpen && (
              <ul className="dropdown-menu absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-lg py-2">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/login">Logout</Link>
                </li>
                
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navadmin

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPen, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';

function Slidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation(); // ใช้ location เพื่อเช็คเส้นทางปัจจุบัน

  const Menus = [
    { title: "หน้าแรก", icon: faHome, link: "/" },
    { title: "ส่งคำร้องขอยืม", icon: faPen, link: "/Form" },
    { title: "ประวัติขอยืม", icon: faUser, gap: true, link: "#" },
    { title: "ติดต่อ", icon: faCalendar, link: "#" },
  ];

  return (
    <div className="flex">
      {/* Slidebar */}
      <div
        className={`${open ? "w-72" : "w-20"
          } bg-KKU min-h-screen h-full p-5 pt-8 relative duration-300 z-20 fixed`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-KKU
           border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo1.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
          <img
            src="./src/assets/logo2 (2).png" // โลโก้หรือข้อความที่ต้องการแสดงแทน h1
            className={`duration-200 ${open && "opacity-100"} ${!open && "opacity-0"} w-100 h-16`} // ใช้ opacity แทน scale-0
            alt="Designer Text"
          />
        </div>
        {/* ใช้ space-y-4 เพื่อให้ระยะห่างเท่ากันระหว่างรายการ */}
        <ul className="pt-6 space-y-4">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : ""} 
              ${location.pathname === Menu.link ? "bg-light-white text-blue-500" : ""}`}
            >
              <Link to={Menu.link} className="flex items-center gap-x-4">
                <FontAwesomeIcon icon={Menu.icon} className="text-lg" />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Optional main content area */}
      <div className="flex-grow p-6">
        {/* Your main content here */}
      </div>
    </div>
  );
}

export default Slidebar;

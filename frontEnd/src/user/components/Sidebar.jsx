import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Slidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation(); // ใช้ location เพื่อเช็คเส้นทางปัจจุบัน
  const Menus = [
    { title: "หน้าแรก", src: "Chart_fill", link: "/" },
    { title: "ส่งคำร้องขอยืม", src: "Chart_fill", link: "/Form" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex">
      {/* Slidebar */}
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-KKU min-h-screen h-full p-5 pt-8 relative duration-300 z-20 fixed`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-KKU
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} 
              ${location.pathname === Menu.link ? "bg-light-white text-blue-500" : ""}
              `}
            >
              <Link to={Menu.link} className="flex items-center gap-x-4">
                <img src={`./src/assets/${Menu.src}.png`} />
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

export default Slidebar

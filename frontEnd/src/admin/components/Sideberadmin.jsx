import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPen, faUser, faCalendar, faBars } from '@fortawesome/free-solid-svg-icons';


function Slidebaradmin() {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    const Menus = [
        { title: "หน้าแรก", icon: faHome, link: "/admin/Home" },
        { title: "เพิ่มข้อมูลโน๊ตบุ๊ค", icon: faPen, link: "/admin/Details" },
        { title: "ประวัติขอยืม", icon: faUser, gap: true, link: "#" },
        { title: "ติดต่อ", icon: faCalendar, link: "#" },
    ];

    return (
        <div className="flex">
            {/* Slidebar */}
            <div
                className={`${open ? "w-72" : "w-20"
                    } bg-blue min-h-screen h-full p-5 pt-8 relative duration-300 z-20 fixed`}
            >
                {/* ปุ่มเปิด/ปิด Sidebar */}
                {/* <div
                    className="absolute cursor-pointer -right-5 top-9 text-3xl w-10 h-10 flex items-center justify-center"
                    onClick={() => setOpen(!open)}
                >
                    <FontAwesomeIcon icon={faBars} className="text-white" />
                </div> */}

                <div className="flex gap-x-4 items-center">
                    {/* <img
                        src="./src/assets/logo1.png"
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
                        alt="Logo1"
                    /> */}
                    <img
                        src="./src/assets/logo2 (2).png"
                        className={`duration-200 ${open ? "opacity-100" : "opacity-0"} w-100 h-16`}
                        alt="ADmin"
                    />
                </div>

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

export default Slidebaradmin;

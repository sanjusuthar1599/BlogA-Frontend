import React, { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { FaPlus, FaUser, FaCog, FaBars } from "react-icons/fa";
import { IoHome, IoLogOut } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout from your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff5c35",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "No, stay logged in",
    });

    if (!confirm.isConfirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login", {
      state: { message: "Logout successful!" },
    });
    if (isOpen) setIsOpen(false);
  };  

  const userName = localStorage.getItem("name") || "User";
  const firstName = userName.split(" ")[0];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLinkClick = (path) => {
    navigate(path);
    if (isOpen) setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800 main-content">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-orange-600 text-white rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <MdClose size={24} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
      fixed inset-y-0 left-0 z-40 w-64 
      bg-gradient-to-br from-orange-600 to-yellow-400 
      dark:from-gray-800 dark:to-gray-700 dark:bg-gray-900
      text-white p-6 transform 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0 transition-transform duration-300 ease-in-out
      flex flex-col justify-between sidebar
    `}
      >
        <div>
          {/* Logo */}
          <div className="flex justify-center items-center mb-6 space-x-3">
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
              alt="logo"
              className="w-12"
            />
            <span className="text-3xl font-bold text-white dark:text-white">
              SKBlog
            </span>
          </div>

          <hr className="border-white/40" />

          <ul className="space-y-4 mt-8 text-lg font-medium ">
            <li>
              <button
                className="w-full text-left flex items-center gap-2 hover-dark hover:bg-orange-700 dark:hover:bg-gray-700 p-2 rounded transition"
                onClick={() => handleLinkClick("/")}
              >
                <IoHome /> Dashboard
              </button>
            </li>
            <li>
              <button
                className="w-full text-left flex items-center gap-2 hover-dark hover:bg-orange-700 dark:hover:bg-gray-700 p-2 rounded transition"
                onClick={() => handleLinkClick("/add-post")}
              >
                <FaPlus /> Add Post
              </button>
            </li>
            <li>
              <button
                className="w-full text-left flex items-center gap-2 hover-dark hover:bg-orange-700 dark:hover:bg-gray-700 p-2 rounded transition"
                onClick={() => handleLinkClick("/contact")}
              >
                <FaUser /> Contact
              </button>
            </li>
            <li>
              <button
                className="w-full text-left flex items-center gap-2 hover-dark hover:bg-orange-700 dark:hover:bg-gray-700 p-2 rounded transition"
                onClick={() => handleLinkClick("/setting")}
              >
                <FaCog /> Settings
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 hover-dark hover:bg-orange-700 dark:hover:bg-gray-700 p-2 rounded transition"
              >
                <IoLogOut />Logout
              </button>
            </li>
          </ul>
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-md text-white text-xl text-center dark-banner">
          Welcome, <span className="font-semibold">{firstName}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow md:ml-64 p-6 pt-5 pb-4 bg-gray-100 dark:bg-[#000] text-gray-800 dark:text-white">
        <Outlet />
      </div>
    </div>

    // <div className="min-h-screen flex bg-gray-100">
    //   {/* Mobile Toggle Button */}
    //   <button
    //     className="md:hidden fixed top-4 left-4 z-50 p-2 bg-orange-600 text-white rounded-full shadow-lg"
    //     onClick={toggleSidebar}
    //   >
    //     {isOpen ? <MdClose size={24} /> : <FaBars size={20} />}
    //   </button>

    //   {/* Sidebar */}
    //   <div
    //     className={`
    //       fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-br from-orange-600 to-yellow-400 text-white p-6
    //       transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
    //       transition-transform duration-300 ease-in-out flex flex-col justify-between
    //     `}
    //   >
    //     <div>
    //       <div className="flex justify-center items-center mb-6 space-x-3">
    //         <img
    //           src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=black"
    //           alt="logo"
    //           className="w-12"
    //         />
    //         <span className="text-3xl font-bold text-white">SKBlog</span>
    //       </div>

    //       <hr className="border-white/40" />

    //       <ul className="space-y-4 mt-8 text-lg font-medium">
    //         <li>
    //           <button
    //             className="w-full text-left flex items-center gap-2 hover:bg-orange-700 p-2 rounded transition"
    //             onClick={() => handleLinkClick("/")}
    //           >
    //             <IoHome /> Dashboard
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className="w-full text-left flex items-center gap-2 hover:bg-orange-700 p-2 rounded transition"
    //             onClick={() => handleLinkClick("/add-post")}
    //           >
    //             <FaPlus /> Add Post
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className="w-full text-left flex items-center gap-2 hover:bg-orange-700 p-2 rounded transition"
    //             onClick={() => handleLinkClick("/contact")}
    //           >
    //             <FaUser /> Contact
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             className="w-full text-left flex items-center gap-2 hover:bg-orange-700 p-2 rounded transition"
    //            onClick={() => handleLinkClick("setting")}
    //           >
    //             <FaCog /> Settings
    //           </button>
    //         </li>
    //         <li>
    //           <button
    //             onClick={handleLogout}
    //             className="w-full flex items-center gap-2 hover:bg-orange-700 p-2 rounded transition"
    //           >
    //             <IoLogOut className="text-lg" />
    //             <span>Logout</span>
    //           </button>
    //         </li>
    //       </ul>
    //     </div>

    //     <div className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 p-3 ps-0 pe-0 rounded-xl shadow-md text-white text-xl text-center">
    //        Welcome, <span className="font-semibold">{firstName}</span>
    //     </div>
    //   </div>

    //   {/* Main Content (with responsive left margin) */}
    //   <div className="flex-grow md:ml-64 p-3 md:p-6">
    //     <Outlet />
    //   </div>
    // </div>
  );
};

export default Sidebar;


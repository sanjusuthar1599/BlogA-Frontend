// import React, { useState ,useEffect, useRef } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { IoSettings, IoLogOut } from "react-icons/io5";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const [active, setActive] = useState("Blog");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const navLinks = [
//     { name: "Blog", path: "/blog" },
//     { name: "Add Blog", path: "/add-blog" },
//     { name: "Contact", path: "/contact" },
//   ];

//   const getName = () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       return user.charAt(0).toUpperCase() || "E";
//     } catch (err) {
//       return "E";
//     }
//   };

//   const getuser = localStorage.getItem("user");

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/", {
//       state: { message: "Logout successful!" },
//     });
//   };

//   const toggleMenu = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (
//       dropdownRef.current &&
//       !dropdownRef.current.contains(event.target)
//     ) {
//       setDropdownOpen(false);
//     }
//   };

//   document.addEventListener("mousedown", handleClickOutside);
//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, []);


//   return (
//     <nav className="bg-white backdrop-blur-md shadow-md fixed w-full z-50">
//       <div className="lg:px-28 px-4">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex items-center space-x-4">
//             <Link
//               to="/blog"
//               className="flex items-center text-2xl font-bold text-gray-800"
//             >
//               <span className="bg-gradient-to-br from-[#f13a14] to-[#f8a62d] bg-clip-text text-transparent">
//                 SKBlog
//               </span>
//               <img
//                 src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=black"
//                 alt="logo"
//                 className="w-16"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 onClick={() => setActive(link.name)}
//                 className={`${
//                   active === link.name
//                     ? "bg-gradient-to-br from-[#f13a14] to-[#f8a62d] bg-clip-text text-transparent font-bold"
//                     : "text-gray-600 hover:text-gray-900"
//                 } transition`}
//               >
//                 {link.name}
//               </Link>
//             ))}

//             {getuser ? (
//               <div className="relative" ref={dropdownRef}>
//                 <a
//                   href="#"
//                   onClick={toggleMenu}
//                   className="transition flex justify-center items-center 
//                   w-10 h-10 rounded-full border border-gray-400 text-white 
//                   bg-gradient-to-br from-[#f13a14] to-[#f8a62d] 
//                   hover:opacity-90 shadow-md"
//                 >
//                   <span className="text-2xl font-semibold">{getName()}</span>
//                 </a>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-36 rounded-xl shadow-lg z-50 bg-gradient-to-br from-[#f13a14] to-[#f8a62d] text-white">
//                     <div className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gradient-to-br from-[#f13a14] to-[#f8a62d] hover:text-white transition rounded-xl">
//                       <IoSettings className="text-lg" />
//                       <span>Setting</span>
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gradient-to-br from-[#f13a14] to-[#f8a62d] hover:text-white transition rounded-xl"
//                     >
//                       <IoLogOut className="text-lg" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 to="/"
//                 className="px-4 py-2 bg-red-800 text-white rounded-lg"
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>

//           {/* Mobile Hamburger Icon */}
//           <div className="md:hidden">
//             <button onClick={() => setOpen(!open)}>
//               {open ? (
//                 <FaTimes className="text-2xl text-gray-800" />
//               ) : (
//                 <FaBars className="text-2xl text-gray-800" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden bg-white px-4 pb-4">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               onClick={() => setOpen(false)}
//               className="block py-2 text-gray-600 hover:text-gray-900 transition"
//             >
//               {link.name}
//             </Link>
//           ))}

//           {getuser ? (
//             <button
//               onClick={() => {
//                 setOpen(false);
//                 handleLogout();
//               }}
//               className="block mt-2 px-4 py-2 bg-red-800 text-white rounded-lg w-full text-center"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link
//               to="/"
//               onClick={() => setOpen(false)}
//               className="block mt-2 px-4 py-2 bg-red-800 text-white rounded-lg text-center"
//             >
//               Sign In
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

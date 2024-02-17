import React, { useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/#",
  },
  {
    id: 2,
    name: "ABOUT",
    link: "/#about",
  },
  {
    id: 3,
    name: "SHOW ROOM",
    link: "/cars",
  },

  // {
  //   id: 4,
  //   name: "CONTACT US",
  //   link: "/#booking",
  // },
];
const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu && !e.target.closest(".responsive-menu")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300
    "
    >
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <span className="text-3xl font-bold font-serif cursor-pointer">
              Carz<span className="text-red-700">Arena</span>
            </span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <a
                    href={link}
                    className=" text-lg font-medium  hover:text-red-700 py-2 hover:border-b-2 hover:border-red-700 transition-colors duration-500  "
                  >
                    {name}
                  </a>
                </li>
              ))}
              <Link to="/profile">
                {currentUser && (
                  <p className=" text-lg font-medium  hover:text-red-700 py-2 hover:border-b-2 hover:border-red-700 transition-colors duration-500  ">
                    PROFILE
                  </p>
                )}
              </Link>
              {/* DarkMode feature implement */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl"
                />
              )}
            </ul>
          </nav>
          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            {/* dark  mode */}
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl"
              />
            )}
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={(e) => toggleMenu(e)}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={(e) => toggleMenu(e)}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} currentUser={currentUser} />
    </div>
  );
};

export default Navbar;

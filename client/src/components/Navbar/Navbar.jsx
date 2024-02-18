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
    name: "LOGIN",
    link: "/sign-in",
  },
  {
    id: 2,
    name: "REGISTER",
    link: "/sign-up",
  },

];

export const Userlinks = [
  {
    id: 1,
    name: "PROFILE",
    link: "/sign-in",
  },
  {
    id: 2,
    name: "BUDDIES",
    link: "/sign-up",
  },
  {
    id: 3,
    name: "DISCOVER",
    link: "/sign-in",
  },
  {
    id: 4,
    name: "SETTINGS",
    link: "/sign-up",
  },
  {
    id: 5,
    name: "LOGOUT",
    link: "/sign-up",
  }, 

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
              Brillo<span className="text-green-700">Connetz</span>
            </span>
          </Link>
          <nav className="hidden md:block">
          {currentUser?.status ? (

            <ul className="flex items-center gap-8">
              {Userlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <Link
                    to={link}
                    className=" text-lg font-medium  hover:text-green-700 py-2 hover:border-b-2 hover:border-green-700 transition-colors duration-500  "
                  >
                    {name}
                  </Link>
                </li>
              ))}
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
          ) : (
            <ul className="flex items-center gap-8">
            {Navlinks.map(({ id, name, link }) => (
              <li key={id} className="py-4">
                <Link
                  to={link}
                  className=" text-lg font-medium  hover:text-green-700 py-2 hover:border-b-2 hover:border-green-700 transition-colors duration-500  "
                >
                  {name}
                </Link>
              </li>
            ))}
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
          )}
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

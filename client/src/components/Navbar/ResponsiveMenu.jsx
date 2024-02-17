import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navlinks } from "./Navbar";

const ResponsiveMenu = ({ showMenu }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1>Hello,</h1>
            <h1 className="text-sm text-slate-500">Welcome to 606 Autos</h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {Navlinks.map((data, index) => (
              <li key={index}>
                <a
                  href={data.link}
                  className="mb-5 inline-block hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-500 "
                >
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/profile">
          {currentUser && (
            <p className=" text-xl hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500 ">
              PROFILE
            </p>
          )}
        </Link>
      </div>
      <div className="footer">
        <h1>606 Autos</h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;

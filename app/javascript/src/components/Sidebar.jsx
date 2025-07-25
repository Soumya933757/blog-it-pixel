import React, { useRef } from "react";

import { Edit, Folder, List, ListDetails } from "@bigbinary/neeto-icons";
import { Popover, Typography } from "@bigbinary/neetoui";
import { NavLink, Link, useLocation } from "react-router-dom";

import { resetAuthTokens } from "../apis/axios";
import { useLogout } from "../hooks/reactQuery/authApi";
import { getFromLocalStorage, setToLocalStorage } from "../utils/storage";

const Sidebar = ({ setShowCategories }) => {
  const location = useLocation();

  const profileRef = useRef(null);

  const userName = getFromLocalStorage("authUserName");
  const userEmail = getFromLocalStorage("authEmail");

  const showCategoryList = () => {
    setShowCategories(prev => !prev);
  };

  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        setToLocalStorage({
          authToken: null,
          email: null,
          userId: null,
          userName: null,
        });
        resetAuthTokens();
        window.location.href = "/";
      },
      onError: error => {
        logger.error(error);
      },
    });
  };

  return (
    <div className="flex h-screen  w-[10%] flex-col items-center justify-between gap-4 border-r py-10 md:w-[5%]">
      <div className="flex flex-col items-center gap-6">
        <Link to="/">
          <img
            alt="profile"
            className="h-6 w-6  "
            src="https://img.icons8.com/?size=100&id=tz1GQBtNqT2P&format=png&color=000000"
          />
        </Link>
        <NavLink exact to="/">
          <List className="h-6 w-6 cursor-pointer" />
        </NavLink>
        <NavLink exact to="/posts/create">
          <Edit className="h-6 w-6 cursor-pointer" />
        </NavLink>
        {location.pathname === "/" && (
          <ListDetails
            className="h-6 w-6 cursor-pointer"
            onClick={showCategoryList}
          />
        )}
        <NavLink exact to="/my-blogs">
          <Folder className="h-6 w-6 cursor-pointer" />
        </NavLink>
      </div>
      <div className="relative">
        <img
          alt="profile"
          className="h-8 w-8 rounded-full border "
          ref={profileRef}
          src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
        />
        <Popover className="w-52" position="right" reference={profileRef}>
          <div className="flex w-full flex-col ">
            <div className="border-b py-1">
              <Typography>{userName}</Typography>
              <Typography>{userEmail}</Typography>
            </div>
            <div className="flex items-center gap-2 py-1">
              <div
                className="cursor-pointer text-[15px] font-semibold"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};
export default Sidebar;

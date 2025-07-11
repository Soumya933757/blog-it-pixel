import React, { useRef } from "react";

import { Edit, List, ListDetails } from "@bigbinary/neeto-icons";
import { Popover, Typography } from "@bigbinary/neetoui";
import { Link, useLocation } from "react-router-dom";

import authApi from "../apis/auth";
import { resetAuthTokens } from "../apis/axios";
import { getFromLocalStorage, setToLocalStorage } from "../utils/storage";

const Sidebar = ({ setShowCategories }) => {
  const location = useLocation();

  const profileRef = useRef(null);

  const userName = getFromLocalStorage("authUserName");
  const userEmail = getFromLocalStorage("authEmail");

  const showCategoryList = () => {
    if (location.pathname === "/") setShowCategories(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex h-screen  w-[10%] flex-col items-center justify-between gap-4 border-r py-10 md:w-[5%]">
      <div className="flex flex-col items-center gap-6">
        <img
          alt="profile"
          className="h-6 w-6  "
          src="https://img.icons8.com/?size=100&id=tz1GQBtNqT2P&format=png&color=000000"
        />
        <Link to="/">
          <List className="h-6 w-6 cursor-pointer" />
        </Link>
        <Link to="/posts/create">
          <Edit className="h-6 w-6 cursor-pointer" />
        </Link>
        <ListDetails
          className="h-6 w-6 cursor-pointer"
          onClick={showCategoryList}
        />
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

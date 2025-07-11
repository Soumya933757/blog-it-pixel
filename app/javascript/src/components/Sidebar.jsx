import React from "react";

import { Edit, List, ListDetails } from "@bigbinary/neeto-icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ setShowCategories }) => {
  const location = useLocation();

  const showCategoryList = () => {
    if (location.pathname === "/") setShowCategories(prev => !prev);
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
      <img
        alt="profile"
        className="h-8 w-8 rounded-full border "
        src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
      />
    </div>
  );
};
export default Sidebar;

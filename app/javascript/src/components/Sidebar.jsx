import React from "react";

const Sidebar = () => (
  <div className="flex h-screen  w-[15%] flex-col items-center justify-between gap-4 border-r py-10 md:w-[5%]">
    <div className="flex flex-col items-center gap-6">
      <img
        alt="profile"
        className="h-6 w-6  "
        src="https://img.icons8.com/?size=100&id=2797&format=png&color=000000"
      />
      <img
        alt="profile"
        className="h-6 w-6  "
        src="https://img.icons8.com/?size=100&id=8113&format=png&color=000000"
      />
    </div>
    <img
      alt="profile"
      className="h-8 w-8 rounded-full border "
      src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
    />
  </div>
);

export default Sidebar;

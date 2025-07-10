import React, { useState } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Category from "../Category";
import Sidebar from "../Sidebar";

const Container = ({ children, className = "" }) => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="flex max-h-screen w-full ">
      <Sidebar setShowCategories={setShowCategories} />
      {showCategories && <Category />}
      <div
        className={classnames(
          "blog-list max-w-8xl mx-auto max-h-screen overflow-y-scroll px-6",
          [className]
        )}
      >
        {children}
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;

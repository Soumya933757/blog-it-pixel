import React from "react";

const ItemList = ({ category }) => (
  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 ">
    {category.name}
  </span>
);

export default ItemList;

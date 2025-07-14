import React from "react";

import { Checkbox } from "@bigbinary/neetoui";

import Row from "./Row";

const Table = ({ blogs }) => (
  <table className="">
    <thead>
      <tr className="bg-gray-100 text-left">
        <th className="px-2 py-2">
          <Checkbox />
        </th>
        <th className="px-2 py-2 ">TITLE</th>
        <th className="px-2 py-2">CATEGORY</th>
        <th className="px-2 py-2">LAST PUBLISHED AT</th>
        <th className="px-2 py-2">STATUS</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {blogs.map(blog => (
        <Row blog={blog} key={blog.id} />
      ))}
    </tbody>
  </table>
);

export default Table;

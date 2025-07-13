import React from "react";

import MyBlogs from "./Blogs";

import { Container, PageTitle } from "../commons";

const index = () => (
  <Container className="max-h-screen w-full">
    <div className="flex w-full flex-col gap-y-8 ">
      <div className="flex items-end justify-between">
        <PageTitle title="My blog posts" />
      </div>
      <MyBlogs />
    </div>
  </Container>
);

export default index;

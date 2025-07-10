import React from "react";

import { Link } from "react-router-dom";

import { Button, Container, PageTitle } from "../commons";
import Posts from "../Posts";

const index = () => (
  <Container className="max-h-screen w-full">
    <div className="flex w-full flex-col gap-y-8 ">
      <div className="flex items-end justify-between">
        <PageTitle title="Blog Posts" />
        <Link to="/posts/create">
          <Button buttonText="Add new blog post" />
        </Link>
      </div>
      <Posts />
    </div>
  </Container>
);

export default index;

import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { isNil, isEmpty, either } from "ramda";

import Table from "./Table";

import { useFetchPosts } from "../../hooks/reactQuery/postsApi";
import { getFromLocalStorage } from "../../utils/storage";
import { PageLoader } from "../commons";

const MyBlogs = () => {
  const userId = getFromLocalStorage("authUserId");

  const { data, isFetching } = useFetchPosts();
  const blogs = data?.posts?.filter(post => post.user.id === userId) || [];

  if (isFetching) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(blogs)) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Typography className="my-5 text-center text-xl leading-5 ">
          No Posts to show 🥳
        </Typography>
      </div>
    );
  }

  return <Table blogs={blogs} />;
};

export default MyBlogs;

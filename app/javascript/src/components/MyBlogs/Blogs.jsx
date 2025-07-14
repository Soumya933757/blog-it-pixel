import React from "react";

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
      <h1 className="my-5 text-center text-xl leading-5">
        You have not created any posts 🥳
      </h1>
    );
  }

  return <Table blogs={blogs} />;
};

export default MyBlogs;

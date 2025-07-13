import React, { useEffect, useState } from "react";

import { isNil, isEmpty, either } from "ramda";

import Table from "./Table";

import postsApi from "../../apis/posts";
import { getFromLocalStorage } from "../../utils/storage";
import { PageLoader } from "../commons";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = getFromLocalStorage("authUserId");

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setBlogs(posts.filter(post => post.user.id === userId));
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
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

  return <Table blogs={blogs} fetchPosts={fetchPosts} />;
};

export default MyBlogs;

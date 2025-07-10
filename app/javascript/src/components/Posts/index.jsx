import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";
import { useHistory } from "react-router-dom";

import Card from "./Card";

import postsApi from "../../apis/posts";
import { PageLoader } from "../commons";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const showPost = slug => {
    history.push(`/posts/${slug}/show`);
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

  if (either(isNil, isEmpty)(posts)) {
    return (
      <h1 className="my-5 text-center text-xl leading-5">
        You have not created or been assigned any posts 🥳
      </h1>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map(post => (
        <Card key={post.id} post={post} showPost={showPost} />
      ))}
    </div>
  );
};

export default Dashboard;

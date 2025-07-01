import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";

import Card from "./Card";

import postsApi from "../../apis/posts";
import { Container, PageLoader, PageTitle } from "../commons";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
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

  useEffect(() => {
    fetchTasks();
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
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-8 ">
      <PageTitle title="Blog Posts" />
      {posts.map(post => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";
import { useHistory, Link } from "react-router-dom";

import Card from "./Card";

import postsApi from "../../apis/posts";
import { Button, Container, PageLoader, PageTitle } from "../commons";

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
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not created or been assigned any posts 🥳
        </h1>
      </Container>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-8 ">
      <div className="flex items-end justify-between">
        <PageTitle title="Blog Posts" />
        <Link to="/posts/create">
          <Button buttonText="Add new blog post" />
        </Link>
      </div>
      {posts.map(post => (
        <Card key={post.id} post={post} showPost={showPost} />
      ))}
    </div>
  );
};

export default Dashboard;

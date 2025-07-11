import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";
import { useHistory } from "react-router-dom";

import Card from "./Card";

import postsApi from "../../apis/posts";
import useCategoryItemStore from "../../stores/useCategoryItemStore";
import { PageLoader } from "../commons";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const { selectedCategories } = useCategoryItemStore();

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

  const filteredPosts = !isEmpty(selectedCategories)
    ? posts.filter(post =>
        post.categories?.some(category =>
          selectedCategories.includes(category.id)
        )
      )
    : posts;

  return (
    <div className="flex flex-col gap-4">
      {filteredPosts?.map(post => (
        <Card key={post.id} post={post} showPost={showPost} />
      ))}
    </div>
  );
};

export default Dashboard;

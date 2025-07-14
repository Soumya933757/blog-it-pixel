import React from "react";

import { isNil, isEmpty, either } from "ramda";
import { useHistory } from "react-router-dom";

import Card from "./Card";

import { useFetchPosts } from "../../hooks/reactQuery/postsApi";
import useCategoryItemStore from "../../stores/useCategoryItemStore";
import { PageLoader } from "../commons";

const Dashboard = () => {
  const history = useHistory();

  const { selectedCategories } = useCategoryItemStore();

  const { data, isFetching } = useFetchPosts();
  const posts = data?.posts || [];

  const showPost = slug => {
    history.push(`/posts/${slug}/show`);
  };

  if (isFetching) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <h1 className="my-5 text-center text-xl leading-5">
        No Posts to show 🥳
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
      {filteredPosts
        ?.filter(post => post.status === "Published")
        .map(post => (
          <Card key={post.id} post={post} showPost={showPost} />
        ))}
    </div>
  );
};

export default Dashboard;

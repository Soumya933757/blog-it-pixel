import React, { useState, useEffect } from "react";

import { Container, PageLoader } from "components/commons";
import { useParams } from "react-router-dom";

import Form from "./Form";
import Header from "./Header";

import { useShowPost, useUpdatePost } from "../../hooks/reactQuery/postsApi";

const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatedTime, setUpdatedTime] = useState("");
  const [status, setStatus] = useState("Draft");
  const [showStatus, setShowStatus] = useState("");
  const { slug } = useParams();

  const { data, isFetching } = useShowPost(slug);
  useEffect(() => {
    if (data) {
      const post = data.post;
      setTitle(post.title);
      setDescription(post.description);
      setCategory(post.categories?.map(category => category.id));
      setStatus(post.status);
      setUpdatedTime(post.updated_at);
      setShowStatus(post.status);
    }
  }, [data]);

  const { mutate: updatePost } = useUpdatePost();

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);

    updatePost(
      {
        slug,
        payload: {
          title,
          description,
          category_ids: category,
          status,
        },
      },
      {
        onSuccess: () => {
          setLoading(false);
          history.push("/");
        },
        onError: error => {
          setLoading(false);
          logger.error(error);
        },
      }
    );
  };

  if (isFetching) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container className="max-h-screen w-full">
      <div className="flex h-full flex-col gap-y-8">
        <Header
          handleSubmit={handleSubmit}
          loading={loading}
          setStatus={setStatus}
          showStatus={showStatus}
          status={status}
          type="edit"
          updatedTime={updatedTime}
        />
        <Form
          category={category}
          description={description}
          setCategory={setCategory}
          setDescription={setDescription}
          setTitle={setTitle}
          title={title}
        />
      </div>
    </Container>
  );
};

export default Edit;

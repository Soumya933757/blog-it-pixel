import React, { useState } from "react";

import postsApi from "apis/posts";
import { Container } from "components/commons";

import Form from "./Form";
import Header from "./Header";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({
        post: { title, description, category_ids: category, status },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container className="max-h-screen w-full">
      <div className="flex h-full flex-col gap-y-8">
        <Header setStatus={setStatus} status={status} type="create" />
        <Form
          category={category}
          description={description}
          handleSubmit={handleSubmit}
          loading={loading}
          setCategory={setCategory}
          setDescription={setDescription}
          setTitle={setTitle}
          title={title}
        />
      </div>
    </Container>
  );
};

export default Create;

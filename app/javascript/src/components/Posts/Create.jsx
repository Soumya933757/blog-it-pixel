import React, { useState } from "react";

import postsApi from "apis/posts";
import { Container, PageTitle } from "components/commons";

import Form from "./Form";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({
        post: { title, description, category_ids: category },
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
        <PageTitle title="New blog post" />
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

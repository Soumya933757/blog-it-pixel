import React, { useState } from "react";

import { Container } from "components/commons";

import Form from "./Form";
import Header from "./Header";

import { useCreatePost } from "../../hooks/reactQuery/postsApi";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState("Draft");
  const { mutate: createPost } = useCreatePost();

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    createPost(
      {
        post: { title, description, category_ids: category, status },
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

  return (
    <Container className="max-h-screen w-full">
      <div className="flex h-full flex-col gap-y-8">
        <Header
          handleSubmit={handleSubmit}
          loading={loading}
          setStatus={setStatus}
          status={status}
          type="create"
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

export default Create;

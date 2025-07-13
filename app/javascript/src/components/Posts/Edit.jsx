import React, { useState, useEffect } from "react";

import { Container, PageLoader } from "components/commons";
import { useParams } from "react-router-dom";

import Form from "./Form";
import Header from "./Header";

import postsApi from "../../apis/posts";

const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [updatedTime, setUpdatedTime] = useState("");
  const [status, setStatus] = useState("Draft");
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await postsApi.update({
        slug,
        payload: { title, description, category_ids: category, status },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchPostDetails = async () => {
    try {
      const {
        data: {
          post: { title, description, categories, status, updated_at },
        },
      } = await postsApi.show(slug);
      setTitle(title);
      setDescription(description);
      setCategory(categories?.map(category => category.id));
      setStatus(status === "Pending" ? "Draft" : status);
      setUpdatedTime(updated_at);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
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
          setStatus={setStatus}
          status={status}
          type="edit"
          updatedTime={updatedTime}
        />
        <Form
          category={category}
          description={description}
          handleSubmit={handleSubmit}
          loading={loading}
          setCategory={setCategory}
          setDescription={setDescription}
          setTitle={setTitle}
          title={title}
          type="update"
        />
      </div>
    </Container>
  );
};

export default Edit;

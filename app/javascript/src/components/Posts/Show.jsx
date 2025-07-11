import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import { Container, PageLoader } from "components/commons";
import { useHistory, useParams } from "react-router-dom";

import { ItemList } from "../commons";

const Show = () => {
  const [post, setPost] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container className="max-h-screen w-full">
      <div className="flex flex-col gap-y-8">
        <div className="mt-8 flex w-full items-start justify-between gap-x-6">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-1">
              {post?.categories.map(category => (
                <ItemList category={category} key={category.id} />
              ))}
            </div>
            <Typography className="text-3xl font-semibold" style="h2">
              {post?.title}
            </Typography>
            <div>
              <Typography className="text-xs font-bold text-slate-500">
                {post.user.name}
              </Typography>
              <Typography className="text-xs text-slate-500">
                {new Date(post.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
            </div>
            <Typography>{post?.description}</Typography>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Show;

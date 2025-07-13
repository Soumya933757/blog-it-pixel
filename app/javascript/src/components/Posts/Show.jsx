import React, { useEffect, useState } from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Tooltip, Typography } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import { Container, PageLoader } from "components/commons";
import { useHistory, useParams } from "react-router-dom";

import ItemList from "../Category/ItemList";

const Show = () => {
  const [post, setPost] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const updatePost = () => {
    history.push(`/posts/${post.slug}/edit`);
  };

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
          <div className="flex w-full flex-col gap-y-2">
            <div className="flex gap-1">
              {post?.categories.map(category => (
                <ItemList category={category} key={category.id} />
              ))}
            </div>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Typography className="text-3xl font-semibold" style="h2">
                  {post?.title}
                </Typography>
                <div>
                  {post?.status === "Draft" && (
                    <div className="rounded-xl border border-red-400 px-3 text-sm text-red-400">
                      Draft
                    </div>
                  )}
                </div>
              </div>
              <Tooltip content="Edit" position="top">
                <div>
                  <Edit onClick={updatePost} />
                </div>
              </Tooltip>
            </div>
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
            <pre className="whitespace-break-spaces">{post?.description}</pre>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Show;

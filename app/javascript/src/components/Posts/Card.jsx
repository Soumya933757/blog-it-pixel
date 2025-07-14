import React from "react";

import { Typography } from "@bigbinary/neetoui";

import ItemList from "../Category/ItemList";

const Card = ({ post, showPost }) => (
  <div className="flex w-full flex-col gap-2 border-b p-2">
    <Typography
      className="cursor-pointer text-xl font-bold"
      style="h2"
      onClick={() => showPost(post.slug)}
    >
      {post.title.slice(0, 50)}
      {post.title.length > 50 ? "..." : ""}
    </Typography>
    <div className="flex gap-1">
      {post?.categories.map(category => (
        <ItemList category={category} key={category.id} />
      ))}
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
  </div>
);

export default Card;

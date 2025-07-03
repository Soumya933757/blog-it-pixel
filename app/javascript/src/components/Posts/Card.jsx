import React from "react";

const Card = ({ post, showPost }) => (
  <div
    className="flex w-full flex-col gap-2 border-b p-2"
    onClick={() => showPost(post.slug)}
  >
    <h2 className="text-xl font-bold">{post.title}</h2>
    <p className="text-base text-slate-700">{post.description}</p>
    <p className="text-xs text-slate-500">
      {new Date(post.created_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </p>
  </div>
);

export default Card;

import React from "react";

import ItemList from "../commons/ItemList";

const Card = ({ post, showPost }) => (
  <div className="flex w-full flex-col gap-2 border-b p-2">
    <h2 className="text-xl font-bold" onClick={() => showPost(post.slug)}>
      {post.title}
    </h2>
    <div className="flex gap-1">
      {post?.categories.map(category => (
        <ItemList category={category} key={category.id} />
      ))}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-500">{post.user.name}</p>
      <p className="text-xs text-slate-500">
        {new Date(post.created_at).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  </div>
);

export default Card;

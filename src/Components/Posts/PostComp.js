import React from "react";
import { useDispatch } from "react-redux";
import { addEmoji } from "./PostSlice";
const PostComp = ({ post }) => {
  const reactionEmojis = {
    like: "🤷‍♂️",
    share: "👶",
    subscribe: "🙆‍♀️",
  };

  const dispatch = useDispatch();

  const options = Object.entries(reactionEmojis).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(addEmoji({ postId: post.id, reaction: name, post }))
        }
      >
        {emoji} {post.templates[name]}
      </button>
    );
  });
  return (
    <div style={{ marginBottom: "50px" }}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>{post.date}</p>
      {options}
    </div>
  );
};

export default PostComp;

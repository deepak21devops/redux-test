import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostComp from "./PostComp";
import { fetchPosts, allPosts, error, status } from "./PostSlice";

const PostList = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const posts = useSelector(allPosts);
  const postError = useSelector(error);
  const postStatus = useSelector(status);

  const dispatch = useDispatch();

  const handlePost = (e) => {
    e.preventDefault();

    setTitle("");
    setContent("");
  };

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, postStatus]);

  let data;
  if (postStatus === "Pending") {
    data = <p>Loading......</p>;
  } else if (postStatus === "FulFilled") {
    const post = posts;
    if (post.length !== 0) {
      data =
        post &&
        post.map((ele) => {
          return <PostComp key={ele.id} post={ele} />;
        });
    } else {
      data = "";
      return data;
    }
  } else if (postStatus === "Rejected") {
    data = <p>{postError}</p>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button onClick={(e) => handlePost(e)}>Add Post</button>
      </div>
      <div>{data}</div>
    </>
  );
};

export default PostList;

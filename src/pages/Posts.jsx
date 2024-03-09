import React from "react";
import { json, useLoaderData } from "react-router-dom";
import PostItem from "../components/PostItem";


const Posts = () => {
  const posts = useLoaderData();
  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => <PostItem post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;

export const loader = async () => {
  const response = await fetch(`${process.env.REACT_APP_DOMAIN}/posts`);
  if (!response.ok) {
    throw json({ message: "Can't get the posts you want" }, { status: 500 });
  } else {
    const data = await response.json();
    return data.posts;
  }
};

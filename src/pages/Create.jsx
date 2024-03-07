import React from "react";
import PostForm from "../components/PostForm";

const Create = () => {
  return (
    <div>
      <PostForm header={"Create your post now!!"} postBtn={"Create Post"} method={"post"}/>
    </div>
  );
};

export default Create;


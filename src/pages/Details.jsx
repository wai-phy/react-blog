import React from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import PostDetails from "../components/PostDetails";
import { getToken } from "../utils/getToken";


const Details = () => {
  const post = useRouteLoaderData("post-detail");
  return <PostDetails post={post} />;
};

export default Details;
export const loader = async ({ request, params }) => {
  const response = await fetch(`${process.env.REACT_APP_DOMAIN}/posts/${params.id}`);
  if (!response.ok) {
    throw json({ message: "Can't get data!" }, { status: 500 });
  } else {
    const data = await response.json();
    return data.post;
  }
};

export const action = async ({ request, params }) => {
  const token = getToken();
  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/posts/${params.id}`,
    {
      method: request.method,
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("");
  }
  return redirect("/");
};

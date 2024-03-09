import { Form, Link, redirect, useActionData } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import uuid from "react-uuid";
import { getToken } from "../utils/getToken";


const PostForm = ({ header, postBtn, oldPostData, method }) => {
  const data = useActionData();
  return (
    <section className="form-section">
      <h4>{header}</h4>
      <Link to={"/"}>
        <ArrowLeftIcon className="arrowIcon" />
      </Link>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li className="form-error" key={err}>
              {err}
            </li>
          ))}
        </ul>
      )}
      <Form method={method}>
        <div>
          <label htmlFor="form-title">Title</label>
          <input
            type="text"
            id="form-title"
            name="title"
            defaultValue={oldPostData ? oldPostData.title : ""}
          />
        </div>
        <div>
          <label htmlFor="form-image">Image Url</label>
          <input
            type="url"
            id="form-image"
            name="image"
            defaultValue={oldPostData ? oldPostData.image : ""}
          />
        </div>
        <div>
          <label htmlFor="form-date">Date</label>
          <input
            type="date"
            id="form-date"
            name="date"
            defaultValue={oldPostData ? oldPostData.date : ""}
          />
        </div>
        <div>
          <label htmlFor="form-desc">Description</label>
          <textarea name="description" id="form-desc" cols="50" rows="6">
            {oldPostData ? oldPostData.description : ""}
          </textarea>
        </div>
        <button className="post-btn">{postBtn}</button>
      </Form>
    </section>
  );
};

export default PostForm;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const method = request.method;
  const token = getToken();
  const postData = {
    id: uuid(),
    title: data.get("title"),
    description: data.get("description"),
    image: data.get("image"),
    date: data.get("date"),
  };

  let url = `${process.env.REACT_APP_DOMAIN}/posts`;
  if (method === "PATCH") {
    const id = params.id;
    url = `${process.env.REACT_APP_DOMAIN}/posts/${id}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });
  if (response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw new Error("");
  } else {
    return redirect("/");
  }
};

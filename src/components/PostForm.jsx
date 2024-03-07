import { Form, Link, useActionData } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const PostForm = ({header, postBtn, oldPostData}) => {
  const data = useActionData();
  return (
    <section className="form-section">
      <h4>{header}</h4>
      <Link to={"/"}>
        <ArrowLeftIcon className="arrowIcon" />
      </Link>
      {
        data && data.errors && (
          <ul>
            {
              Object.values(data.errors).map((err)=>(
                <li className="form-error" key={err}>{err}</li>
              ))
            }
          </ul>
        )
      }
      <Form method="post">
        <div>
          <label htmlFor="form-title">Title</label>
          <input type="text" id="form-title" name="title" defaultValue={oldPostData? oldPostData.title : ''}/>
        </div>
        <div>
          <label htmlFor="form-image">Image Url</label>
          <input type="url" id="form-image" name="image" defaultValue={oldPostData? oldPostData.image : ''}/>
        </div>
        <div>
          <label htmlFor="form-date">Date</label>
          <input type="date" id="form-date" name="date" defaultValue={oldPostData? oldPostData.date : ''}/>
        </div>
        <div>
          <label htmlFor="form-desc">Description</label>
          <textarea
            name="description"
            id="form-desc"
            cols="50"
            rows="6"
          >{oldPostData? oldPostData.description : ''}</textarea>
        </div>
        <button className="post-btn">{postBtn}</button>
      </Form>
    </section>
  );
};

export default PostForm;

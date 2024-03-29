import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

const PostDetails = ({ post }) => {
  const { title, image, date, description } = post;
  const submit = useSubmit();
  const isToken = useRouteLoaderData("root");
  const postDeleteHandler = () => {
    const conFirmStatus = window.confirm(
      "Are you sure you want to delete this?"
    );

    if (conFirmStatus) {
      submit(null, { method: "DELETE" });
    }
  };
  return (
    <section className="detail">
      <h1>Post Details</h1>
      <div className="post-detail">
        <div>
          <h2>{title.toUpperCase()}</h2>
          <p className="date">
            <CalendarDaysIcon className="dateIcon" />
            {date}
          </p>
        </div>
        <Link to={"/"}>
          <ArrowLeftIcon className="arrowIcon" />
        </Link>
      </div>
      <img src={image} alt={title} />
      <p>{description}</p>
      <div className="detail-footer">
        {isToken && (
          <Link to={`edit-post`}>
            <p className="sm-edit">Edit</p>
          </Link>
        )}
        {isToken && (
          <p className="sm-delete" onClick={postDeleteHandler}>
            Delete
          </p>
        )}
      </div>
    </section>
  );
};

export default PostDetails;

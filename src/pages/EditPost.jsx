import { useRouteLoaderData } from "react-router-dom";
import PostForm from "../components/PostForm";

const EditPost = () => {
  const post = useRouteLoaderData("post-detail");
  return (
    <section>
      <PostForm
        header={"Edit your post now!!"}
        postBtn={"Edit Post"}
        oldPostData={post}
        method={"patch"}
      />
    </section>
  );
};

export default EditPost;

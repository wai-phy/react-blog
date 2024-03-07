import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Posts, { loader as postsLoader } from "./pages/Posts";
import {
  action as deleteAction,
  loader as postDetailLoader,
} from "./pages/Details";
import { action as postCreateAction } from "./components/PostForm";
import { action as postUpdateAction } from "./components/PostForm";
import Create from "./pages/Create";
import Details from "./pages/Details";
import EditPost from "./pages/EditPost";
import Error from "./pages/Error";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Posts />,
          loader: postsLoader,
        },
        {
          path: "/create-post",
          element: <Create />,
          action: postCreateAction,
        },
        {
          path: ":id",
          id: "post-detail",
          loader: postDetailLoader,
          children: [
            {
              index: true,
              element: <Details />,
              action: deleteAction,
            },
            {
              path: "edit-post",
              element: <EditPost />,
              action: postUpdateAction,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

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
import Auth, { action as authAction } from "./pages/Auth";
import { loader as logoutLoader } from "./pages/Logout";
import { checkTokenLoader, tokenLoader } from "./utils/getToken";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      id: "root",
      loader: tokenLoader,
      children: [
        {
          index: true,
          element: <Posts />,
          loader: postsLoader,
        },
        {
          path: "/create-post",
          element: <Create />,
          loader : checkTokenLoader,
          action: postCreateAction,
        },
        {
          path: "/auth",
          element: <Auth />,
          action: authAction,
        },
        {
          path: "/logout",
          loader: logoutLoader,
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
              loader : checkTokenLoader,
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

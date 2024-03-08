import React, { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import { getEpireDuration } from "../utils/getToken";
import Loading from "../components/Loading";

const Main = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  const { state } = useNavigation();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "Token Expired") {
      submit(null, { action: "/logout", method: "POST" });
    }
    const duration = getEpireDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, [duration]);
  }, [token, submit]);
  return (
    <div className="main">
      <Navbar />
      {state === "loading" ? <Loading/> : <Outlet />}
    </div>
  );
};

export default Main;

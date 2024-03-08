import { redirect } from "react-router-dom";

export const getEpireDuration = () => {
  const expDate = localStorage.getItem("expireIn");
  const expDateMili = new Date(expDate);
  const currentDateMili = new Date();
  const duration = expDateMili - currentDateMili;
  return duration;
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if(!token){
    return null;
  }

  const duration = getEpireDuration();
  if(duration < 0){
    return "Token Expired"
  }
  return token;
};

export const tokenLoader = () => {
  return getToken();
};

export const checkTokenLoader = () => {
  const token = getToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return token;
};


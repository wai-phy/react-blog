import { redirect } from "react-router-dom";

export const loader = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("expireIn");
    return redirect("/")
}
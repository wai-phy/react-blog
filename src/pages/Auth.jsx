import {
  Link,
  Form,
  useSearchParams,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
const Auth = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  console.log(isLogin);
  return (
    <section className="form-section">
      <h4>{isLogin ? "Login To Your Account" : "Create A New Account"}</h4>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <Form method="post">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button className="login-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : isLogin ? "Login" : "Register"}
        </button>
      </Form>
      {isLogin ? (
        <p>
          Don't you have a account?{" "}
          <Link to={"/auth?mode=signup"} className="sign-up">
            Create A Account
          </Link>
        </p>
      ) : (
        <p>
          Already Have A Account?{" "}
          <Link to={"/auth"} className="sign-up">
            Login Here
          </Link>
        </p>
      )}
    </section>
  );
};

export default Auth;

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw new Error();
  }

  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Not Ok" }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);
  // console.log(token)
  const expireDate = new Date();
  expireDate.setHours(expireDate.getHours() + 1);
  localStorage.setItem("expireIn", expireDate.toISOString());
  return redirect("/");
};

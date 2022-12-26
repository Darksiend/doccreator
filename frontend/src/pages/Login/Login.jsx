import React from "react";
import "./Login.css";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert("Cant Auth");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Cant log in!");
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div className="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-text">כניסה לחשבון</div>
        <input
          {...register("email", { required: "Put Email" })}
          className="login-register-inputs"
          type="text"
        />
        <input
          {...register("password", { required: "Put Password" })}
          className="login-register-inputs"
          type="text"
        />
        <button className="btn" type="submit">
          כניסה
        </button>
      </form>
    </div>
  );
};

export default Login;

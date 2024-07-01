/* eslint-disable react/prop-types */
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) {
        throw new Error("Invalid credentials");
      }
      const userData = JSON.parse(storedUserData);

      if (
        userData.email !== data.email ||
        userData.password !== data.password
      ) {
        throw new Error("Invalid credentials");
      }

      setLoginError(null);
      onLoginSuccess(userData);
      navigate("/");
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login Form</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && <p className="error">{errors.password.message}</p>}
        {loginError && <p className="error">{loginError}</p>}
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Login;

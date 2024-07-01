/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});
function Register({ setUserData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Registration Form</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <button type="submit">Register</button>
      </div>
    </form>
  );
}

export default Register;

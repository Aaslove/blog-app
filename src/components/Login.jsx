import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();

  const loginBtn = async (data) => {
    setError("");
    try {
      const session = await authService?.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl  p-10 bordeer border-black/10">
        <span className="inline-block w-full max-w-[100]">
          <Logo width="100%" />
        </span>
      </div>
      <h2>Sign in to your account</h2>
      <p className="mt-2 text-center text-base text-black/60">
        Don&apos;t have any account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form className="mt-8" onSubmit={handleSubmit(loginBtn)}>
        <div>
          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            label="Password:"
            placeholder="Enter the password"
            type="password"
            {...register("password", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                    value
                  ) || "Password must be a valid password",
              },
            })}
          />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;

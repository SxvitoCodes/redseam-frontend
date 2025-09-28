import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "./Input";
import Button from "./Button";
import { API_URL } from "../config";
import Eye from "../assets/eye.svg";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await axios.post(API_URL + "/login", data, {
        headers: { Accept: "application/json" },
      });
      const { user, token } = res.data;
      login(user, token); // save to context + localStorage
      navigate("/dashboard"); // redirect after success
    } catch (err) {
      const axiosError = err as AxiosError<{
        message?: string;
        errors?: Record<string, string[]>;
      }>;
      console.error(axiosError.response?.data);
      const msg =
        axiosError.response?.data?.message ??
        "Something went wrong. Please try again.";

      setServerError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
      <Input
        placeholder="Email"
        type="email"
        {...register("email")}
        variant={errors.email ? "error" : "default"}
        errorMessage={errors.email?.message}
      />

      <Input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        variant={errors.password ? "error" : "default"}
        errorMessage={errors.password?.message}
        iconRight={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="focus:outline-none cursor-pointer"
          >
            <img src={Eye} alt="eye svg" />
          </button>
        }
      />

      <Button type="submit" className="w-full py-[10px]">
        Login
      </Button>
      {serverError && <p className="text-red text-sm mt-2">{serverError}</p>}
      <p className="text-center">
        <span className="text-secondary text-[0.875rem]">Not a member? </span>
        <span>
          <Link to="/register" className="text-red text-[0.875rem] font-medium">
            Register
          </Link>
        </span>
      </p>
    </form>
  );
}

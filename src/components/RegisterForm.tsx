import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import type { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "./Input";
import Button from "./Button";
import { API_URL } from "../config";
import Eye from "../assets/eye.svg";

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    password_confirmation: z.string(),
    avatar: z.any().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const handleFileChange = (file: File | null) => {
    setAvatarFile(file);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview(null);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: RegisterData) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      setServerError(null); // reset before request
      const res = await axios.post(API_URL + "/register", formData, {
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
      <div>
        {!avatarPreview ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => document.getElementById("avatarInput")?.click()}
          >
            Upload Avatar
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="h-20 w-20 object-cover rounded-full"
            />
            <div className="flex gap-4 text-seondary text-[0.875rem]">
              <button
                type="button"
                onClick={() => document.getElementById("avatarInput")?.click()}
                className="cursor-pointer"
              >
                Upload New
              </button>
              <button
                type="button"
                onClick={() => handleFileChange(null)}
                className="cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
        />
      </div>

      <Input
        placeholder="Username"
        {...register("username")}
        variant={errors.username ? "error" : "default"}
        errorMessage={errors.username?.message}
      />

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

      <Input
        placeholder="Confirm Password"
        type={showConfirmedPassword ? "text" : "password"}
        {...register("password_confirmation")}
        variant={errors.password_confirmation ? "error" : "default"}
        errorMessage={errors.password_confirmation?.message}
        iconRight={
          <button
            type="button"
            onClick={() => setShowConfirmedPassword((prev) => !prev)}
            className="focus:outline-none cursor-pointer"
          >
            <img src={Eye} alt="eye svg" />
          </button>
        }
      />

      <Button type="submit" className="w-full">
        Register
      </Button>
      {serverError && <p className="text-red text-sm mt-2">{serverError}</p>}
      <p className="text-center">
        <span className="text-secondary text-[0.875rem]">Already member? </span>
        <span>
          <Link to="/login" className="text-red text-[0.875rem] font-medium">
            Log in
          </Link>
        </span>
      </p>
    </form>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "./Input";
import Button from "./Button";
import { API_URL } from "../config";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        type="password"
        {...register("password")}
        variant={errors.password ? "error" : "default"}
        errorMessage={errors.password?.message}
      />

      <Input
        placeholder="Confirm Password"
        type="password"
        {...register("password_confirmation")}
        variant={errors.password_confirmation ? "error" : "default"}
        errorMessage={errors.password_confirmation?.message}
      />

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
              className="h-20 w-20 object-cover rounded-full border"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => document.getElementById("avatarInput")?.click()}
              >
                Upload New
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleFileChange(null)}
              >
                Remove
              </Button>
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

      <Button type="submit" className="w-full">
        Register
      </Button>
      {serverError && <p className="text-red text-sm mt-2">{serverError}</p>}
    </form>
  );
}

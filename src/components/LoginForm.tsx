import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await axios.post("/login", data, {
        headers: { Accept: "application/json" },
      });
      console.log("Logged in:", res.data);
      // TODO: save token, redirect
    } catch (err: any) {
      console.error(err.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}

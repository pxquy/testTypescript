import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginForm = z.infer<typeof loginSchema>;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      const { data } = await axios.post("http://localhost:3000/login", values);
      toast.success("Đăng nhập thành công");
      reset();
      console.log("User:", data);
    } catch (error) {
      toast.error("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Đăng nhập</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger mt-1">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;

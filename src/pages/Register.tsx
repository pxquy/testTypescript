import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const registerSchema = z.object({
  name: z.string().min(1, "Không được để trống tên"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type RegisterForm = z.infer<typeof registerSchema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterForm) => {
    try {
      await axios.post("http://localhost:3000/register", values);
      toast.success("Đăng ký thành công");
      reset();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Đăng ký tài khoản</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Họ và tên
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-danger mt-1">{errors.name.message}</p>
          )}
        </div>

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
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;

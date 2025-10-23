import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const courseSchema = z.object({
  courseName: z.string().min(1, "Không được để trống"),
});

type CourseForm = z.infer<typeof courseSchema>;

function Add() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = async (values: CourseForm) => {
    try {
      await axios.post("http://localhost:3000/courses", values);
      toast.success("Thêm thành công");
      reset();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div>
      <h1>Thêm mới</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Tên khóa học
          </label>
          <input
            type="text"
            id="text"
            className="form-control"
            {...register("courseName")}
          />
          {errors.courseName && (
            <p className="text-danger">{errors.courseName.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Add;

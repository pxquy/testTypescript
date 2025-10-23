import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const courseSchema = z.object({
  courseName: z.string().min(1, "Không được để trống"),
});

type CourseForm = z.infer<typeof courseSchema>;

function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/courses/${id}`);
        reset(data);
      } catch (error) {
        toast.error("Không tìm thấy khóa học");
      }
    };
    fetchCourse();
  }, [id, reset]);

  const onSubmit = async (values: CourseForm) => {
    try {
      await axios.put(`http://localhost:3000/courses/${id}`, values);
      toast.success("Cập nhật thành công");
      navigate("/");
    } catch (error) {
      toast.error("Lỗi khi cập nhật");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Cập nhật khóa học</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="courseName" className="form-label">
            Tên khóa học
          </label>
          <input
            type="text"
            id="courseName"
            className="form-control"
            {...register("courseName")}
          />
          {errors.courseName && (
            <p className="text-danger mt-1">{errors.courseName.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

export default Edit;

import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Courses {
  courseName: string;
}

const AddPage = () => {
  const [courses, setCourses] = useState<Courses>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Courses>();

  const onSubmit = async (data: Courses) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("courseName")} />
      </form>
    </>
  );
};

export default AddPage;

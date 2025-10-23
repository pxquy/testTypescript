import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface Courses {
  id: string;
  courseName: string;
}

function List() {
  const [courses, setCourses] = useState<Courses[]>([]);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/Courses");
      setCourses(data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/Courses/${id}`);
      toast.success("Xoá thành công!");
      setCourses((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error("Lỗi khi xoá!");
    }
  };

  return (
    <div className="p-5">
      <h1>Danh sách</h1>
      <table className="table table-hover table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên khoá học</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{c.courseName}</td>
              <td>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="btn btn-danger btn-sm me-2"
                >
                  Xoá
                </button>
                <Link to={`/edit/${c.id}`} className="btn btn-primary btn-sm">
                  Sửa
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;

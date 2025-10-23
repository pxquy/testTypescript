import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import List from "./pages/List";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      {/* Header với Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <strong>WEB502 App</strong>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Trang chủ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Danh sách
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add">
                  Thêm mới
                </a>
              </li>
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Đăng nhập
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="register">
                  Đăng ký
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h1 className="display-4 text-center mb-4">
              Chào mừng đến với WEB502
            </h1>
            <p className="lead text-center">Ứng dụng quản lý dữ liệu</p>
          </div>
        </div>
      </div>

      <Routes>
        <Route index element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

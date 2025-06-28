import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageTasks from "./pages/admin/ManageTasks";
import CreateTask from "./pages/admin/CreateTask";
import ManageUsers from "./pages/admin/ManageUsers";
import UserDashboard from "./pages/user/UserDashboard";
import MyTasks from "./pages/user/MyTasks";
import TaskDetails from "./pages/user/TaskDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />

          {/* //Admin Routes */}
          <Routes element={<PrivateRoutes allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />

            {/* //User Routes */}
            <Routes element={<PrivateRoutes allowedRoles={["admin"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/tasks" element={<MyTasks />} />
              <Route path="/user/task-details:id" element={<TaskDetails />} />
            </Routes>
          </Routes>
        </Routes>
      </Router>
    </>
  );
}

export default App;

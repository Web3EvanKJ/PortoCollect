import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ProjectDetail from "./pages/public/ProjectDetail.tsx";
import Login from "./pages/admin/Login.tsx";
import ProtectedRoute from "./components/fragments/ProtectedRoute.tsx";
import AdminProjects from "./pages/admin/AdminProjects.tsx";
import CreateProject from "./pages/admin/CreateProject.tsx";
import EditProject from "./pages/admin/EditProject.tsx";
import Projects from "./pages/public/Projects.tsx";
import AppLayout from "./components/layouts/AppLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<App />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/projects/create" element={<CreateProject />} />
            <Route path="/admin/projects/:id/edit" element={<EditProject />} />
          </Route>

          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

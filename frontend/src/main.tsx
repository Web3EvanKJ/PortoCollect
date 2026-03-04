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
import { AuthProvider } from "./context/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUp from "./pages/admin/SignUp.tsx";
import VerifyOtp from "./pages/admin/VerifyOtp.tsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              {/* Public Routes */}
              <Route path="/" element={<App />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />

              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              <Route path="/auth/verify-otp" element={<VerifyOtp />} />

              {/* Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route
                  path="/admin/projects/create"
                  element={<CreateProject />}
                />
                <Route
                  path="/admin/projects/:id/edit"
                  element={<EditProject />}
                />
              </Route>

              <Route path="*" element={<div>Not Found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);

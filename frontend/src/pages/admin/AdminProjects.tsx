import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../api/axios";
import { Layers, Plus, Pencil, Trash2, Tag } from "lucide-react";
import { ConfirmModal } from "../../components/fragments/ConfirmModal";

//  Main Page
export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; slug: string | null }>({
    open: false,
    slug: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      // ignore error (in case token expired)
    }

    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/admin/login");
  };
  const fetchProjects = async () => {
    setLoading(true);
    const res = await api.get("/my-projects");
    setProjects(res.data.data);
    setLoading(false);
  };

  const handleDeleteRequest = (slug: string) => {
    setModal({ open: true, slug });
  };

  const handleDeleteConfirm = async () => {
    if (!modal.slug) return;
    await api.delete(`/admin/projects/${modal.slug}`);
    setModal({ open: false, slug: null });
    fetchProjects();
  };

  const handleDeleteCancel = () => {
    setModal({ open: false, slug: null });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  console.log(projects);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Confirmation Modal */}
      <ConfirmModal
        open={modal.open}
        title="Delete project?"
        description="This action cannot be undone. The project and all its data will be permanently removed."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      <div className="max-w-[1100px] mx-auto px-12 py-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-extrabold text-[2rem] text-[#0a0a0f] tracking-tight mb-1">
              Manage Projects
            </h1>
            <p className="text-[#80809a] text-sm">
              {projects.length} project{projects.length !== 1 ? "s" : ""} total
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to="/admin/projects/create"
              className="flex items-center gap-2 bg-[#F9140D] text-white px-5 py-2.5 rounded-[10px] text-sm font-semibold no-underline hover:bg-[#d90f0b] hover:-translate-y-px transition-all duration-200"
            >
              <Plus size={15} strokeWidth={2.5} />
              New Project
            </Link>
            {isLoggedIn && (
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-[#000000] text-white px-5 py-2.5 rounded-[10px] text-sm font-semibold no-underline hover:bg-[#333333] hover:-translate-y-px transition-all duration-200 shadow-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Table card */}
        <div
          className="bg-white border border-black/[0.07] rounded-[20px] overflow-hidden"
          style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
        >
          {/* Table header */}
          <div className="grid grid-cols-[2fr_160px_140px_180px] gap-4 px-7 py-3.5 border-b border-black/[0.06] bg-[#f8f8fb]">
            <span className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[#a0a0b8]">
              Project
            </span>
            <span className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[#a0a0b8]">
              Category
            </span>
            <span className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[#a0a0b8]">
              Status
            </span>
            <span className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[#a0a0b8]">
              Actions
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-[#F9140D]/20 border-t-[#F9140D] animate-spin" />
              <span className="text-sm text-[#80809a]">Loading...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-11 h-11 rounded-xl bg-[#F9140D]/[0.07] border border-[#F9140D]/[0.14] flex items-center justify-center mb-3">
                <Layers size={20} color="#F9140D" strokeWidth={1.8} />
              </div>
              <p className="text-[#80809a] text-sm">No projects yet.</p>
              <Link
                to="/admin/projects/create"
                className="mt-4 text-[#F9140D] text-sm font-semibold no-underline hover:underline"
              >
                Create your first project →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-black/[0.05]">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="grid grid-cols-[2fr_160px_140px_180px]  gap-4 items-center px-7 py-4 hover:bg-[#fafafa] transition-colors duration-150"
                >
                  {/* Title */}
                  <div
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    className="cursor-pointer"
                  >
                    <p className="font-semibold text-[0.92rem] text-[#0a0a0f] tracking-tight">
                      {project.title}
                    </p>
                    {project.slug && (
                      <p className="text-[0.75rem] text-[#a0a0b8] mt-0.5">
                        /{project.slug}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    {project.category ? (
                      <div className="inline-flex items-center gap-1.5 bg-[#F9140D]/[0.06] border border-[#F9140D]/[0.12] text-[#F9140D] px-2.5 py-1 rounded-full text-[0.7rem] font-semibold">
                        <Tag size={10} strokeWidth={2.5} />
                        {project.category}
                      </div>
                    ) : (
                      <span className="text-[#c0c0d0] text-xs">—</span>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    {project.is_published ? (
                      <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 px-2.5 py-1 rounded-full text-[0.7rem] font-semibold">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Published
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 bg-[#f5f5f8] border border-black/[0.07] text-[#a0a0b8] px-2.5 py-1 rounded-full text-[0.7rem] font-semibold">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c0c0d0]" />
                        Draft
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <Link
                      to={`/admin/projects/${project.slug}/edit`}
                      className="inline-flex items-center gap-1.5 text-[#70708a] text-[0.8rem] font-medium no-underline px-3 py-1.5 rounded-lg border border-black/[0.08] hover:text-[#0a0a0f] hover:border-black/20 hover:bg-black/[0.02] transition-all duration-150"
                    >
                      <Pencil size={12} strokeWidth={2} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteRequest(project.slug)}
                      className="inline-flex items-center gap-1.5 text-[#F9140D] text-[0.8rem] font-medium px-3 py-1.5 rounded-lg border border-[#F9140D]/20 hover:bg-[#F9140D]/[0.05] hover:border-[#F9140D]/40 transition-all duration-150"
                    >
                      <Trash2 size={12} strokeWidth={2} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

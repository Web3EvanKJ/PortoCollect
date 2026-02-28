import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router";
import { ExternalLink, Github, ArrowRight, Layers, Tag } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => {
        setProjects(res.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#F9140D]/20 border-t-[#F9140D] animate-spin" />
          <span className="text-sm text-[#80809a]">Loading projects...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-[1100px] mx-auto px-12 py-20">
        {/* Header */}
        <div className="mb-14">
          <h1 className="font-extrabold text-[2.6rem] text-[#0a0a0f] tracking-tight leading-tight mb-3">
            Public Projects ({projects.length})
          </h1>
          <p className="text-[#80809a] text-[1rem] max-w-md leading-relaxed">
            Explore our curated collection of developer portfolio projects,
            built with modern tech stacks.
          </p>
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[18px] border border-black/[0.07]">
            <div className="w-12 h-12 rounded-xl bg-[#F9140D]/[0.07] border border-[#F9140D]/[0.14] flex items-center justify-center mx-auto mb-4">
              <Layers size={20} color="#F9140D" strokeWidth={1.8} />
            </div>
            <p className="text-[#80809a] text-sm">No projects yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white border border-black/[0.07] rounded-[18px] p-7 flex flex-col hover:border-[#F9140D]/30 hover:shadow-lg transition-all duration-200 shadow-sm"
              >
                {/* Top row: category badge */}
                <div className="flex items-center justify-between mb-5">
                  {project.category && (
                    <div className="inline-flex items-center gap-1.5 bg-[#F9140D]/[0.06] border border-[#F9140D]/[0.12] text-[#F9140D] px-2.5 py-1 rounded-full text-[0.7rem] font-semibold tracking-wide">
                      <Tag size={10} strokeWidth={2.5} />
                      {project.category}
                    </div>
                  )}
                  <div className="flex items-center gap-2 ml-auto">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg border border-black/[0.08] flex items-center justify-center text-[#80809a] hover:text-[#0a0a0f] hover:border-black/20 transition-all duration-150 no-underline"
                      >
                        <Github size={14} strokeWidth={1.8} />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg border border-black/[0.08] flex items-center justify-center text-[#80809a] hover:text-[#0a0a0f] hover:border-black/20 transition-all duration-150 no-underline"
                      >
                        <ExternalLink size={14} strokeWidth={1.8} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <h2 className="font-bold text-[1.05rem] text-[#0a0a0f] mb-2 tracking-tight leading-snug">
                  {project.title}
                </h2>
                <p className="text-[#80809a] text-[0.88rem] leading-relaxed line-clamp-2 mb-5 flex-1">
                  {project.description}
                </p>

                {/* Tech stack */}
                {project.tech_stack?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech_stack.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-[3px] rounded-full bg-[#f0f0f5] text-[#60608a] text-[0.7rem] font-medium border border-black/[0.05]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {project.user_name && (
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-5 h-5 rounded-full bg-[#F9140D]/[0.1] flex items-center justify-center text-[#F9140D] text-[0.6rem] font-bold">
                      {project.user_name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[0.78rem] text-[#80809a] font-medium">
                      {project.user_name}
                    </span>
                  </div>
                )}

                {/* View Details link */}
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-[#F9140D] text-[0.85rem] font-semibold no-underline group-hover:gap-2.5 transition-all duration-200"
                >
                  View Details
                  <ArrowRight size={14} strokeWidth={2.2} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

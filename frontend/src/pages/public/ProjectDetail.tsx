import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api/axios";
import { Github, ExternalLink, Tag, Calendar } from "lucide-react";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    api.get(`/projects/${slug}`).then((res) => setProject(res.data.data));
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#F9140D]/20 border-t-[#F9140D] animate-spin" />
          <span className="text-sm text-[#80809a]">Loading project...</span>
        </div>
      </div>
    );
  }

  const createdDate = project.created_at
    ? new Date(project.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-[800px] mx-auto px-12 py-16">
        {/* Card */}
        <div className="bg-white border border-black/[0.07] rounded-[22px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          {/* Card header band */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#F9140D] to-[#ff5e59]" />

          <div className="p-10">
            {/* Meta row */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              {project.category && (
                <div className="inline-flex items-center gap-1.5 bg-[#F9140D]/[0.06] border border-[#F9140D]/[0.12] text-[#F9140D] px-2.5 py-1 rounded-full text-[0.7rem] font-semibold tracking-wide">
                  <Tag size={10} strokeWidth={2.5} />
                  {project.category}
                </div>
              )}
              {project.is_published && (
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 px-2.5 py-1 rounded-full text-[0.7rem] font-semibold tracking-wide">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Published
                </div>
              )}
              {createdDate && (
                <div className="inline-flex items-center gap-1.5 text-[#a0a0b8] text-[0.72rem] font-medium">
                  <Calendar size={11} strokeWidth={2} />
                  {createdDate}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="font-extrabold text-[2rem] text-[#0a0a0f] tracking-tight leading-tight mb-4">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-[#80809a] text-[1rem] leading-[1.8] mb-8">
              {project.description}
            </p>

            {/* Author */}
            {project.user_name && (
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#F9140D]/[0.1] flex items-center justify-center text-[#F9140D] text-[0.7rem] font-bold">
                  {project.user_name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[0.85rem] text-[#80809a] font-medium">
                  {project.user_name}
                </span>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-black/[0.06] mb-8" />

            {/* Tech stack */}
            {project.tech_stack?.length > 0 && (
              <div className="mb-8">
                <p className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#a0a0b8] mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-[#f0f0f5] text-[#50508a] text-[0.8rem] font-medium border border-black/[0.05]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            {(project.github_url || project.live_url) && (
              <div className="flex gap-3 flex-wrap">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0a0a0f] text-white px-6 py-2.5 rounded-[10px] text-sm font-semibold no-underline hover:bg-[#1a1a2e] hover:-translate-y-px transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
                  >
                    <Github size={15} strokeWidth={1.8} />
                    View on GitHub
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#F9140D] text-white px-6 py-2.5 rounded-[10px] text-sm font-semibold no-underline hover:bg-[#d90f0b] hover:-translate-y-px transition-all duration-200 shadow-[0_4px_14px_rgba(249,20,13,0.25)]"
                  >
                    <ExternalLink size={15} strokeWidth={1.8} />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

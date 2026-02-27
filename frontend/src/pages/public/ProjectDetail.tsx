import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api/axios";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    api.get(`/projects/${slug}`)
      .then((res) => setProject(res.data.data));
  }, [slug]);

  if (!project) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-red-600 mb-6">
        {project.title}
      </h1>

      <p className="text-neutral-600 mb-6">
        Category: {project.category?.name}
      </p>

      <div className="text-lg leading-relaxed text-neutral-700 mb-10">
        {project.description}
      </div>

      <div className="flex gap-4">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            className="bg-neutral-800 text-white px-6 py-2 rounded-lg"
          >
            GitHub
          </a>
        )}

        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            className="bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
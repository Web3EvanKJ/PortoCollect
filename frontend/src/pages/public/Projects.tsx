import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/projects")
      .then((res) => {
        setProjects(res.data.data); // because of pagination resource
      })
      .finally(() => setLoading(false));
  }, []);

  console.log(projects)

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Public Projects
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-3 text-red-600">
              {project.title}
            </h2>

            <p className="text-neutral-600 mb-4 line-clamp-3">
              {project.description}
            </p>

            <Link
              to={`/projects/${project.slug}`}
              className="text-red-600 font-medium hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
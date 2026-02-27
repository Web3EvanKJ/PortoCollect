import { Link } from "react-router";

export default function App() {
  return (
    <div className="bg-white text-neutral-800">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-2xl font-bold text-red-600">PortoCollect</h1>
        <div className="space-x-6">
          <Link to="/projects" className="hover:text-red-600">Projects</Link>
          <Link
            to="/admin/login"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Admin Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h2 className="text-5xl font-extrabold mb-6">
          Showcase Your Work.
          <span className="text-red-600"> Impress Recruiters.</span>
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
          PortoCollect is a project management platform where developers
          can publish and manage their portfolio projects in a clean,
          professional format for HR and recruiters.
        </p>

        <Link
          to="/projects"
          className="bg-red-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-red-700 transition"
        >
          View Projects
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-red-600">
              Project Management
            </h3>
            <p className="text-neutral-600">
              Easily manage and update your portfolio projects with a secure admin dashboard.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-red-600">
              Secure API Architecture
            </h3>
            <p className="text-neutral-600">
              Powered by Laravel REST API and React frontend integration.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-red-600">
              Recruiter Friendly
            </h3>
            <p className="text-neutral-600">
              Designed to present technical projects in a clean and structured format.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
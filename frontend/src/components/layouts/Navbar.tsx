import { Layers } from "lucide-react";
import { Link } from "react-router";
import { fontLanding } from "../../utils/fontLanding";
import { useEffect, useState } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <style>{fontLanding}</style>

      <nav className="flex justify-between items-center px-12 py-5 border-b border-black/[0.07] sticky top-0 z-50 backdrop-blur-xl bg-white/90">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-[#F9140D] to-[#ff6b8a] flex items-center justify-center shrink-0">
            <Layers size={15} color="white" strokeWidth={2.2} />
          </div>
          <span className="font-syne font-extrabold text-[1.1rem] text-[#0a0a0f] tracking-tight">
            PortoCollect
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/projects"
            className="text-sm font-bold tracking-wide transition-colors duration-200 no-underline hover:text-[#0a0a0f] text-[#70708a]"
          >
            Projects
          </Link>

          {isLoggedIn ? (
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 bg-transparent border border-[#F9140D]/50 text-[#F9140D] px-7 py-[11px] rounded-[10px] text-sm font-bold no-underline hover:border-[#F9140D] hover:bg-[#F9140D]/[0.05] transition-all duration-200"
            >
              Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 bg-transparent border border-[#F9140D]/50 text-[#F9140D] px-7 py-[11px] rounded-[10px] text-sm font-bold no-underline hover:border-[#F9140D] hover:bg-[#F9140D]/[0.05] transition-all duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

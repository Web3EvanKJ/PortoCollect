import { Layers, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { fontLanding } from "../../utils/fontLanding";
import { useEffect, useState } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <div>
      <style>{fontLanding}</style>

      <nav className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-black/[0.07] sticky top-0 z-50 backdrop-blur-xl bg-white/90 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" onClick={closeMenu}>
          <div className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-[#F9140D] to-[#ff6b8a] flex items-center justify-center shrink-0">
            <Layers size={15} color="white" strokeWidth={2.2} />
          </div>
          <span className="font-syne font-extrabold text-[1.1rem] text-[#0a0a0f] tracking-tight">
            PortoCollect
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/projects"
            className="text-sm font-bold tracking-wide transition-colors duration-200 no-underline hover:text-[#0a0a0f] text-[#70708a]"
          >
            Projects
          </Link>

          {isLoggedIn ? (
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 border border-[#F9140D]/50 text-[#F9140D] px-7 py-[11px] rounded-[10px] text-sm font-bold no-underline hover:border-[#F9140D] hover:bg-[#F9140D]/[0.05] transition-all duration-200"
            >
              Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 border border-[#F9140D]/50 text-[#F9140D] px-7 py-[11px] rounded-[10px] text-sm font-bold no-underline hover:border-[#F9140D] hover:bg-[#F9140D]/[0.05] transition-all duration-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[72px] left-0 w-full bg-white border-b border-black/[0.07] backdrop-blur-xl transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-6">
          <Link
            to="/projects"
            onClick={closeMenu}
            className="text-sm font-bold text-[#70708a]"
          >
            Projects
          </Link>

          {isLoggedIn ? (
            <Link
              to="/admin/projects"
              onClick={closeMenu}
              className="inline-flex justify-center border border-[#F9140D]/50 text-[#F9140D] px-5 py-3 rounded-lg text-sm font-bold"
            >
              Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/admin/login"
              onClick={closeMenu}
              className="inline-flex justify-center border border-[#F9140D]/50 text-[#F9140D] px-5 py-3 rounded-lg text-sm font-bold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

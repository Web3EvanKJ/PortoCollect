import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Layers,
  ArrowRight,
  LayoutGrid,
  ShieldCheck,
  Users,
} from "lucide-react";
import { fontLanding } from "./utils/fontLanding";

export default function App() {
  return (
    <div className="bg-[#fafafa] text-[#0a0a0f] min-h-screen overflow-x-hidden font-sans">
      <style>{fontLanding}</style>

      {/* Noise overlay */}
      <div className="noise" />

      {/* Hero */}
      <section className="relative px-12 pt-[120px] pb-[100px] max-w-[900px] mx-auto text-center">
        {/* Background glow */}
        <div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(232,51,90,0.07)_0%,transparent_68%)] top-[-180px] left-1/2 -translate-x-1/2" />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-syne font-extrabold leading-[1.07] tracking-[-0.03em] mb-6 text-[#0a0a0f] text-[clamp(2.8rem,6vw,4.6rem)]">
            Showcase your work.
            <br />
            <span className="text-[#F9140D] font-sans">
              Impress recruiters.
            </span>
          </h2>

          <p className="text-[1.05rem] max-w-[540px] mx-auto mb-11 leading-[1.75] font-normal text-[#80809a]">
            PortoCollect is a clean, structured platform where developers
            publish and manage portfolio projects — built for the humans who
            read them.
          </p>

          <div className="flex gap-3.5 justify-center flex-wrap">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-[#F9140D] text-white px-8 py-3.5 rounded-[10px] font-semibold text-[0.95rem] tracking-[0.01em] no-underline transition-all duration-200 hover:bg-[#d42a50] hover:-translate-y-px shadow-[0_4px_24px_rgba(232,51,90,0.25)]"
            >
              View Projects
              <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <div className="border-t border-b border-black/[0.07] bg-white">
        <div className="max-w-[960px] mx-auto grid grid-cols-3 px-12 py-10">
          {[
            { num: "10k+", label: "Projects published" },
            { num: "98%", label: "Recruiter satisfaction" },
            { num: "3 min", label: "Average setup time" },
          ].map((s, i) => (
            <div
              key={i}
              className={`text-center px-6 ${i < 2 ? "border-r border-black/[0.07]" : ""}`}
            >
              <div className="font-syne font-extrabold text-[2.4rem] text-[#F9140D] leading-none mb-2">
                {s.num}
              </div>
              <div className="text-[0.82rem] font-medium text-[#a0a0b8]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" className="px-12 py-24 max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#F9140D] text-[0.75rem] font-semibold tracking-[0.1em] uppercase mb-3.5">
            Features
          </p>
          <h3 className="font-syne font-extrabold text-[2.1rem] text-[#0a0a0f] tracking-[-0.02em]">
            Everything you need,{" "}
            <span className="font-sans text-[#c0c0d0]">nothing you don't.</span>
          </h3>
        </div>

        <div
          className="grid gap-[18px]"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          }}
        >
          {[
            {
              icon: <LayoutGrid size={20} color="#F9140D" strokeWidth={1.8} />,
              title: "Project Management",
              desc: "Manage and update your portfolio with a secure, intuitive admin dashboard designed to stay out of your way.",
            },
            {
              icon: <ShieldCheck size={20} color="#F9140D" strokeWidth={1.8} />,
              title: "Secure API Architecture",
              desc: "Powered by Laravel REST API and React. Token-based auth and clean separation of concerns, right out of the box.",
            },
            {
              icon: <Users size={20} color="#F9140D" strokeWidth={1.8} />,
              title: "Recruiter Friendly",
              desc: "Structured, readable, professional. Your projects in a format that respects reviewers' time and attention.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white border border-black/[0.07] rounded-[18px] p-8 hover:border-[#F9140D]/30 hover:shadow-lg transition-all duration-200 cursor-default shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F9140D]/[0.07] border border-[#F9140D]/[0.14] flex items-center justify-center mb-5">
                {f.icon}
              </div>
              <h4 className="font-syne font-bold text-[1.05rem] text-[#0a0a0f] mb-2.5 tracking-tight">
                {f.title}
              </h4>
              <p className="text-[0.9rem] leading-[1.68] text-[#80809a]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.07] bg-white px-12 py-7 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Layers size={16} strokeWidth={2} className="text-[#c0c0d0]" />
          <span className="font-syne font-extrabold text-[0.95rem] text-[#c0c0d0]">
            PortoCollect
          </span>
        </div>
        <span className="text-[0.78rem] text-[#c0c0d0]">
          © 2025 · Built for developers
        </span>
      </footer>
    </div>
  );
}

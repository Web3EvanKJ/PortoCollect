import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../../api/axios";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/projects");
    } catch (err: any) {
      setServerError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] relative">
        <div className="flex flex-col items-center mb-8">
          <h1 className="font-extrabold text-[1.7rem] text-[#0a0a0f] tracking-tight mb-1.5">
            Welcome back
          </h1>
          <p className="text-[#80809a] text-sm">
            Sign in to your admin dashboard
          </p>
        </div>

        <div className="bg-white border border-black/[0.07] rounded-[22px] p-8 shadow-[0_2px_24px_rgba(0,0,0,0.07)]">
          {/* Server Error */}
          {serverError && (
            <div className="flex items-center gap-2.5 bg-[#F9140D]/[0.06] border border-[#F9140D]/20 text-[#F9140D] px-4 py-3 rounded-xl text-sm font-medium mb-6">
              <AlertCircle size={15} strokeWidth={2} className="shrink-0" />
              {serverError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] pointer-events-none">
                  <Mail size={15} strokeWidth={1.8} />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  className={`w-full bg-[#f5f5f8] border rounded-xl pl-10 pr-4 py-3 text-sm
                  ${errors.email ? "border-[#F9140D]" : "border-black/[0.07]"}
                  focus:outline-none focus:ring-2 focus:ring-[#F9140D]/10`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="text-[#F9140D] text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] pointer-events-none">
                  <Lock size={15} strokeWidth={1.8} />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full bg-[#f5f5f8] border rounded-xl pl-10 pr-4 py-3 text-sm
                  ${
                    errors.password ? "border-[#F9140D]" : "border-black/[0.07]"
                  }
                  focus:outline-none focus:ring-2 focus:ring-[#F9140D]/10`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && (
                <p className="text-[#F9140D] text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#F9140D] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#d90f0b] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-2 shadow-[0_4px_14px_rgba(249,20,13,0.25)]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} strokeWidth={2} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#a0a0b8] text-xs mt-6">
          <Link
            to="/"
            className="hover:text-[#0a0a0f] transition-colors duration-150 no-underline"
          >
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}

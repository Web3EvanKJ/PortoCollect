import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../../api/axios";
import { AlertCircle, Mail, Lock, User, ArrowRight } from "lucide-react";
import PasswordInput from "../../components/ui/PasswordInput";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Client validation
  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);

    try {
      await api.post("/register", { name, email, password });

      navigate("/auth/verify-otp", { state: { email } });
    } catch (err: any) {
      // Handle Laravel validation errors (422)
      if (err.response?.status === 422) {
        const backendErrors = err.response.data.errors;
        setErrors({
          name: backendErrors?.name?.[0],
          email: backendErrors?.email?.[0],
          password: backendErrors?.password?.[0],
        });
      } else {
        console.log(err);
        setServerError(err.response?.data?.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">
      <div className="w-full max-w-[420px]">
        <div className="flex flex-col items-center mb-8">
          <h1 className="font-extrabold text-[1.7rem] text-[#0a0a0f] mb-1.5">
            Create Account
          </h1>
          <p className="text-[#80809a] text-sm">Sign up to get started</p>
        </div>

        <div className="bg-white border border-black/[0.07] rounded-[22px] p-8 shadow-[0_2px_24px_rgba(0,0,0,0.07)]">
          {/* Server Error */}
          {serverError && (
            <div className="flex items-center gap-2.5 bg-[#F9140D]/[0.06] border border-[#F9140D]/20 text-[#F9140D] px-4 py-3 rounded-xl text-sm mb-6">
              <AlertCircle size={15} />
              {serverError}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a0a0b8]">
                  <User size={15} strokeWidth={1.8} />
                </div>
                <input
                  type="text"
                  placeholder="Full name"
                  className={`w-full bg-[#f5f5f8] border rounded-xl pl-10 pr-4 py-3 text-sm
                  ${errors.name ? "border-[#F9140D]" : "border-black/[0.07]"}
                  focus:outline-none focus:ring-2 focus:ring-[#F9140D]/10`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {errors.name && (
                <p className="text-[#F9140D] text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a0a0b8]">
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
            <PasswordInput
              value={password}
              onChange={setPassword}
              error={errors.password}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#F9140D] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#d90f0b] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-2 shadow-[0_4px_14px_rgba(249,20,13,0.25)]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={15} strokeWidth={2} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#80809a] text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-[#F9140D] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

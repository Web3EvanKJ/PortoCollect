import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import api from "../../api/axios";
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    try {
      await api.post("/verify-otp", { email, otp });

      toast.success("Email Verified");
      navigate("/auth/login");
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">
      <div className="w-full max-w-[420px]">
        <div className="flex flex-col items-center mb-8">
          <h1 className="font-extrabold text-[1.7rem] text-[#0a0a0f] mb-1.5">
            Verify Email
          </h1>
          <p className="text-[#80809a] text-sm text-center">
            Enter the 6-digit code sent to <br />
            <span className="font-semibold">{email}</span>
          </p>
        </div>

        <div className="bg-white border border-black/[0.07] rounded-[22px] p-8 shadow-[0_2px_24px_rgba(0,0,0,0.07)]">
          {serverError && (
            <div className="flex items-center gap-2.5 bg-[#F9140D]/[0.06] border border-[#F9140D]/20 text-[#F9140D] px-4 py-3 rounded-xl text-sm mb-6">
              <AlertCircle size={15} />
              {serverError}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full text-center tracking-[6px] bg-[#f5f5f8] border border-black/[0.07] rounded-xl px-4 py-3 text-lg font-bold"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F9140D] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#d90f0b]"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

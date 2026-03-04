import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

export default function PasswordInput({
  value,
  onChange,
  error,
  placeholder = "Password",
  className = "",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative">
        {/* Lock icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] pointer-events-none">
          <Lock size={15} strokeWidth={1.8} />
        </div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-[#f5f5f8] border rounded-xl pl-10 pr-10 py-3 text-sm
          ${error ? "border-[#F9140D]" : "border-black/[0.07]"}
          focus:outline-none focus:ring-2 focus:ring-[#F9140D]/10
          ${className}`}
        />

        {/* Eye toggle */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] hover:text-[#0a0a0f] transition"
        >
          {showPassword ? (
            <EyeOff size={16} strokeWidth={1.8} />
          ) : (
            <Eye size={16} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {error && <p className="text-[#F9140D] text-xs mt-1">{error}</p>}
    </div>
  );
}

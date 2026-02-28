import { X } from "lucide-react";

//  Confirmation Modal
export function ConfirmModal({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-[20px] w-full max-w-[400px] p-7 border border-black/[0.07]"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-[#a0a0b8] hover:text-[#0a0a0f] hover:bg-black/[0.05] transition-all duration-150"
        >
          <X size={14} strokeWidth={2} />
        </button>

        <h3 className="font-extrabold text-[1.05rem] text-[#0a0a0f] tracking-tight mb-1.5">
          {title}
        </h3>
        <p className="text-[#80809a] text-sm leading-relaxed mb-7">
          {description}
        </p>

        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-black/[0.1] text-[#0a0a0f] text-sm font-semibold hover:bg-black/[0.03] hover:border-black/20 transition-all duration-150"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-[#F9140D] text-white text-sm font-semibold hover:bg-[#d90f0b] transition-all duration-150"
            style={{ boxShadow: "0 4px 14px rgba(249,20,13,0.25)" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  error,
  touched,
  children,
}: {
  label: string;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.78rem] font-semibold tracking-[0.06em] uppercase text-[#80809a]">
        {label}
      </label>
      {children}
      {touched && error && (
        <p className="text-[#F9140D] text-[0.75rem] font-medium">{error}</p>
      )}
    </div>
  );
}
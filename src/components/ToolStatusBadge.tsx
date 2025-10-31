export type ToolStatus = "not-run" | "draft" | "updated" | "error";

export default function ToolStatusBadge({ status }: { status: ToolStatus }) {
  const map: Record<ToolStatus, { label: string; className: string }> = {
    "not-run": { label: "Not run", className: "bg-white/10 text-white/70" },
    draft: { label: "Draft", className: "bg-yellow-500/20 text-yellow-200" },
    updated: { label: "Updated", className: "bg-emerald-500/20 text-emerald-200" },
    error: { label: "Error", className: "bg-red-500/20 text-red-200" },
  };
  const { label, className } = map[status];
  return (
    <span className={`text-[11px] px-2 py-0.5 rounded-full ${className}`}>{label}</span>
  );
}
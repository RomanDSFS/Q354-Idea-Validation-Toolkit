// src/components/common/JsonBlock.tsx
import { useMemo, useState } from "react";

function IconChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
function IconChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function IconCopy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export default function JsonBlock({
  data,
  title = "JSON",
  initiallyCollapsed = true,
  maxHeight = 240,
}: {
  data: unknown;
  title?: string;
  initiallyCollapsed?: boolean;
  maxHeight?: number;
}) {
  const [collapsed, setCollapsed] = useState(initiallyCollapsed);
  const pretty = useMemo(() => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }, [data]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pretty);
    } catch {
      // no-op
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between px-3 py-2 select-none">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          aria-expanded={!collapsed}
        >
          {collapsed ? (
            <IconChevronRight className="w-4 h-4" />
          ) : (
            <IconChevronDown className="w-4 h-4" />
          )}
          <span>{title}</span>
        </button>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/15"
          aria-label="Copy JSON"
          title="Copy JSON"
        >
          <IconCopy className="w-3.5 h-3.5" />
          Копировать
        </button>
      </div>
      {!collapsed && (
        <pre className="px-3 pb-3 overflow-auto text-sm" style={{ maxHeight }}>
          <code>{pretty}</code>
        </pre>
      )}
    </div>
  );
}

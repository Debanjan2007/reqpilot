"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Send, ChevronDown } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface CollectionItem {
  method: HttpMethod;
  label: string;
  active?: boolean;
}

interface ResponseEntry {
  key: string;
  value: string;
  type: "string" | "number" | "boolean" | "null";
}

/* ─── Data ───────────────────────────────────────────────── */

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "text-method-get",
  POST: "text-method-post",
  PUT: "text-method-put",
  PATCH: "text-method-patch",
  DELETE: "text-method-delete",
};

const METHOD_BG: Record<HttpMethod, string> = {
  GET: "bg-method-get/10",
  POST: "bg-method-post/10",
  PUT: "bg-method-put/10",
  PATCH: "bg-method-patch/10",
  DELETE: "bg-method-delete/10",
};

const COLLECTION: CollectionItem[] = [
  { method: "GET", label: "List users" },
  { method: "POST", label: "Create user", active: true },
  { method: "GET", label: "Get user by ID" },
  { method: "PUT", label: "Update user" },
  { method: "PATCH", label: "Partial update" },
  { method: "DELETE", label: "Delete user" },
];

const REQUEST_TABS = ["Params", "Headers", "Body", "Auth"] as const;

const RESPONSE_ENTRIES: ResponseEntry[] = [
  { key: "id", value: "usr_01jgh4k9", type: "string" },
  { key: "email", value: "alice@example.com", type: "string" },
  { key: "name", value: "Alice Chen", type: "string" },
  { key: "role", value: "developer", type: "string" },
  { key: "verified", value: "true", type: "boolean" },
  { key: "age", value: "29", type: "number" },
  { key: "deletedAt", value: "null", type: "null" },
];

/* ─── Component ──────────────────────────────────────────── */

export function AppPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="preview"
      aria-label="Application preview"
      className="relative overflow-hidden px-4 pb-24 sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={
            isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.98 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Window chrome */}
          <div
            role="img"
            aria-label="Conceptual preview of the ReqPilot desktop application interface. Subject to change."
            className="rounded-xl border border-border overflow-hidden"
            style={{ boxShadow: "var(--shadow-window)" }}
          >
            <TitleBar />

            {/* Three-pane layout */}
            <div className="grid" style={{ gridTemplateColumns: "200px 1fr 240px" }}>
              <Sidebar />
              <RequestPanel />
              <ResponsePanel />
            </div>
          </div>

          {/* Concept disclaimer */}
          <p className="mt-3 text-center text-xs text-text-subtle/60">
            Conceptual preview — interface is subject to change.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────── */

function TitleBar() {
  return (
    <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-2.5">
      {/* Traffic lights */}
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {["bg-error", "bg-warning", "bg-success"].map((color, i) => (
          <span
            key={i}
            className={`inline-block h-2.5 w-2.5 rounded-full ${color} opacity-70`}
          />
        ))}
      </div>
      {/* Title */}
      <div className="flex flex-1 items-center justify-center">
        <span className="font-mono text-xs text-text-subtle">
          ReqPilot — Users Collection
        </span>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside
      aria-label="Collections sidebar"
      className="border-r border-border bg-surface"
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-text-subtle">
          Collections
        </span>
      </div>

      {/* Collection label */}
      <div className="px-3 py-2">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-text-subtle/60">
          Users API
        </p>
        <ul role="list" className="flex flex-col gap-0.5">
          {COLLECTION.map(({ method, label, active }) => (
            <li key={label}>
              <button
                type="button"
                aria-current={active ? "page" : undefined}
                className={[
                  "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[11px] transition-colors",
                  active
                    ? "bg-surface-elevated text-text-primary"
                    : "text-text-muted hover:bg-surface-hover hover:text-text-primary",
                ].join(" ")}
              >
                <MethodBadge method={method} />
                <span className="truncate">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function MethodBadge({ method }: { method: HttpMethod }) {
  return (
    <span
      className={[
        "shrink-0 rounded px-1 py-0.5 font-mono text-[9px] font-bold leading-none",
        METHOD_COLORS[method],
        METHOD_BG[method],
      ].join(" ")}
      aria-label={`HTTP method: ${method}`}
    >
      {method}
    </span>
  );
}

function RequestPanel() {
  return (
    <div
      aria-label="Request panel"
      className="flex flex-col border-r border-border bg-background"
    >
      {/* URL bar */}
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <div className="flex items-center gap-1 rounded border border-method-post/30 bg-method-post/10 px-2 py-1">
          <span className="font-mono text-[10px] font-bold text-method-post">
            POST
          </span>
          <ChevronDown size={9} className="text-method-post/60" />
        </div>
        <div className="flex-1 overflow-hidden rounded border border-border bg-surface-elevated px-2 py-1">
          <span className="block truncate font-mono text-[10px] text-text-muted">
            https://api.example.com/v1/users
          </span>
        </div>
        <button
          type="button"
          disabled
          aria-label="Send request (preview only)"
          className="flex shrink-0 items-center gap-1 rounded bg-primary/90 px-2.5 py-1 text-[10px] font-semibold text-primary-foreground opacity-80"
        >
          <Send size={9} />
          Send
        </button>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Request configuration tabs"
        className="flex border-b border-border"
      >
        {REQUEST_TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            type="button"
            aria-selected={tab === "Body"}
            className={[
              "px-3 py-2 text-[10px] font-medium transition-colors",
              tab === "Body"
                ? "border-b-2 border-primary text-primary"
                : "text-text-subtle hover:text-text-muted",
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Body editor */}
      <div
        role="tabpanel"
        aria-label="Request body"
        className="flex-1 overflow-auto px-3 py-3"
      >
        <JsonEditor />
      </div>
    </div>
  );
}

function JsonEditor() {
  const lines: Array<{ indent: number; content: React.ReactNode }> = [
    {
      indent: 0,
      content: <span className="text-text-muted">{"{"}</span>,
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-info">&quot;name&quot;</span>
          <span className="text-text-muted">: </span>
          <span className="text-success">&quot;Alice Chen&quot;</span>
          <span className="text-text-muted">,</span>
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-info">&quot;email&quot;</span>
          <span className="text-text-muted">: </span>
          <span className="text-success">&quot;alice@example.com&quot;</span>
          <span className="text-text-muted">,</span>
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-info">&quot;role&quot;</span>
          <span className="text-text-muted">: </span>
          <span className="text-success">&quot;developer&quot;</span>
          <span className="text-text-muted">,</span>
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-info">&quot;verified&quot;</span>
          <span className="text-text-muted">: </span>
          <span className="text-purple">true</span>
        </>
      ),
    },
    {
      indent: 0,
      content: <span className="text-text-muted">{"}"}</span>,
    },
  ];

  return (
    <pre
      className="font-mono text-[10px] leading-5 text-text-muted"
      aria-label="Request body JSON editor"
    >
      {lines.map((line, i) => (
        <div key={i} style={{ paddingLeft: `${line.indent * 12}px` }}>
          {line.content}
        </div>
      ))}
    </pre>
  );
}

function ResponsePanel() {
  return (
    <div
      aria-label="Response panel"
      className="flex flex-col bg-surface"
    >
      {/* Status bar */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="rounded bg-success/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-success">
            201
          </span>
          <span className="text-[10px] text-text-subtle">Created</span>
        </div>
        <div className="flex gap-2 text-[10px] text-text-subtle/60">
          <span>124 ms</span>
          <span>·</span>
          <span>0.6 kB</span>
        </div>
      </div>

      {/* Response body */}
      <div
        role="region"
        aria-label="Response body"
        className="flex-1 overflow-auto px-3 py-3"
      >
        <pre className="font-mono text-[10px] leading-5" aria-label="JSON response">
          <span className="text-text-muted">{"{"}</span>
          {RESPONSE_ENTRIES.map(({ key, value, type }) => (
            <div key={key} className="pl-3">
              <span className="text-info">&quot;{key}&quot;</span>
              <span className="text-text-muted">: </span>
              <ResponseValue type={type} value={value} />
              <span className="text-text-muted">,</span>
            </div>
          ))}
          <span className="text-text-muted">{"}"}</span>
        </pre>
      </div>
    </div>
  );
}

function ResponseValue({
  type,
  value,
}: {
  type: ResponseEntry["type"];
  value: string;
}) {
  if (type === "string")
    return <span className="text-success">&quot;{value}&quot;</span>;
  if (type === "boolean") return <span className="text-purple">{value}</span>;
  if (type === "number") return <span className="text-warning">{value}</span>;
  return <span className="text-text-subtle">{value}</span>;
}

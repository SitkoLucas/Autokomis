import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";

const styles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-sm shadow-primary/20",
  secondary:
    "bg-white text-ink border border-border hover:border-ink/30 hover:bg-bg-muted",
  ghost: "bg-transparent text-ink hover:bg-bg-muted",
  dark: "bg-ink text-white hover:bg-ink/90",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  children,
  labelClassName = "text-ink",
}: {
  label: string;
  children: ReactNode;
  labelClassName?: string;
}) {
  return (
    <label className="block text-sm">
      <span className={`mb-1.5 block font-medium ${labelClassName}`}>
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/15";

import { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: ReactNode;
  centered?: boolean;
}

export default function SectionHeader({ label, title, description, centered = false }: SectionHeaderProps) {
  return (
    <div style={{ textAlign: centered ? "center" : undefined, marginBottom: centered ? "3.5rem" : "2rem" }}>
      <span style={{
        display: "inline-block",
        fontSize: ".72rem",
        fontWeight: 700,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: "var(--violet)",
        marginBottom: ".6rem",
      }}>
        {label}
      </span>
      <h2 style={{
        fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
        fontWeight: 800,
        letterSpacing: "-1px",
        color: "#fff",
        marginBottom: ".9rem",
      }}>
        {title}
      </h2>
      {description && (
        <p style={{
          color: "var(--muted)",
          fontSize: "1.05rem",
          ...(centered ? { maxWidth: 500, margin: "0 auto" } : {}),
        }}>
          {description}
        </p>
      )}
    </div>
  );
}

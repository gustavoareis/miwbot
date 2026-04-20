import Link from "next/link";
import { GITHUB_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "2rem clamp(1rem, 4vw, 3rem)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "1rem",
      color: "var(--muted)",
      fontSize: ".85rem",
    }}>
      <span>
        © 2025 <strong style={{ color: "var(--purple)" }}>Miwbot</strong> — Todos os direitos reservados
      </span>
    </footer>
  );
}

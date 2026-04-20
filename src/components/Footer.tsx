import Link from "next/link";
import { GITHUB_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "2rem clamp(1rem, 4vw, 3rem)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1rem",
      color: "var(--muted)",
      fontSize: ".85rem",
    }}>
      <span>
        © 2025 <strong style={{ color: "#fff" }}>Miwbot</strong> — Todos os direitos reservados
      </span>
      <div className="footer-links">
        <Link href={GITHUB_URL} target="_blank" rel="noopener" className="footer-link">GitHub</Link>
        <Link href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener" className="footer-link">MIT License</Link>
      </div>
    </footer>
  );
}

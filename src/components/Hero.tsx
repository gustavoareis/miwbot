import Link from "next/link";
import { DiscordIcon, GitHubIcon } from "@/components/ui/icons";
import { GITHUB_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="home" style={{
      position: "relative",
      height: "100dvh",
      minHeight: 600,
      display: "grid",
      placeItems: "center",
      textAlign: "center",
      overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url('/miwbot-logo.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        transform: "scale(1.08)",
        filter: "brightness(.22) blur(1.5px)",
        transition: "transform 10s ease",
      }} />

      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 0%, rgba(8,8,15,.55) 60%, rgba(8,8,15,.95) 100%)",
      }} />

      <div aria-hidden="true" style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 200,
        background: "linear-gradient(to bottom, transparent, var(--bg))",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 700,
        padding: "var(--nav-h) 1.5rem 0",
        animation: "riseIn .9s cubic-bezier(.22,1,.36,1) both",
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: ".4rem",
          background: "rgba(124,58,237,.15)",
          border: "1px solid rgba(124,58,237,.35)",
          color: "var(--violet)",
          padding: ".3rem .9rem",
          borderRadius: 999,
          fontSize: ".78rem",
          fontWeight: 600,
          letterSpacing: ".04em",
          marginBottom: "1.5rem",
        }}>
          ✦&nbsp; open source · Discord bot
        </div>

        <h1 style={{
          fontSize: "clamp(4.5rem, 14vw, 8rem)",
          fontWeight: 900,
          letterSpacing: "-4px",
          lineHeight: .92,
          marginBottom: ".9rem",
          color: "#fff",
        }}>
          <span className="grad">Miwbot</span>
        </h1>

        <p style={{
          fontSize: ".95rem",
          fontWeight: 600,
          color: "var(--violet)",
          textTransform: "uppercase",
          letterSpacing: ".15em",
          marginBottom: "1.1rem",
        }}>
          Bot de Discord open source
        </p>

        <p style={{ fontSize: "1.1rem", color: "#94a3b8", maxWidth: 440, margin: "0 auto 2.75rem" }}>
          Um bot moderno e leve para servidores do Discord.
        </p>

        <div style={{ display: "flex", gap: ".9rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="#" className="btn btn-lg btn-hero-discord">
            <DiscordIcon size={20} /> Adicionar ao meu servidor
          </Link>
          <Link href={GITHUB_URL} target="_blank" rel="noopener" className="btn btn-lg btn-hero-ghost">
            <GitHubIcon size={18} /> Ver no GitHub
          </Link>
        </div>
      </div>

      <div aria-hidden="true" style={{
        position: "absolute",
        bottom: "2.25rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: ".35rem",
        color: "rgba(255,255,255,.25)",
        fontSize: ".7rem",
        letterSpacing: ".12em",
        textTransform: "uppercase",
        animation: "bounce 2.5s ease infinite",
      }}>
        <span>scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

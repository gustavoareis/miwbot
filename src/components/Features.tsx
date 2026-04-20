"use client";

import { Music2, Bot, GitFork } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import type { ReactNode } from "react";

const features: { icon: ReactNode; iconBg: string; title: string; description: string }[] = [
  {
    icon: <Music2 size={22} />,
    iconBg: "rgba(88,101,242,.15)",
    title: "Música de qualidade",
    description: "Reprodução direta do YouTube e Spotify com suporte a filas, playlists e álbuns completos.",
  },
  {
    icon: <Bot size={22} />,
    iconBg: "rgba(168,85,247,.15)",
    title: "Inteligência Artificial",
    description: "Chat com IA usando o modelo Llama 3.3 70B via Groq — respostas rápidas direto no Discord.",
  },
  {
    icon: <GitFork size={22} />,
    iconBg: "rgba(236,72,153,.15)",
    title: "Open Source",
    description: "100% código aberto sob licença MIT. Contribua, customize ou hospede no seu próprio servidor.",
  },
];

export default function Features() {
  return (
    <section id="recursos" style={{ padding: "5.5rem clamp(1rem, 6vw, 4rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader
          label="Recursos"
          title="Tudo que você precisa"
          description="Funcionalidades completas para deixar seu servidor mais dinâmico e divertido."
          centered
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}>
          {features.map(({ icon, iconBg, title, description }) => (
            <div
              key={title}
              className="feature-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
              }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 12,
                display: "grid", placeItems: "center",
                marginBottom: "1.25rem",
                background: iconBg,
                color: "#fff",
              }}>
                {icon}
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: ".5rem" }}>
                {title}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.65 }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

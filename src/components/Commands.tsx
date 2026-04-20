"use client";

import { useState } from "react";
import { Music2, Bot } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const musicCommands = [
  { name: ".join",         desc: "Conecta ao canal de voz" },
  { name: ".leave",        desc: "Desconecta do canal de voz" },
  { name: ".play <query>", desc: "Toca uma música ou adiciona à fila — YouTube, Spotify ou busca por texto" },
  { name: ".queue",        desc: "Exibe a fila atual e o que está tocando" },
  { name: ".skip",         desc: "Pula para a próxima música" },
  { name: ".pause",        desc: "Pausa a reprodução" },
  { name: ".resume",       desc: "Retoma a reprodução" },
  { name: ".stop",         desc: "Para a música atual" },
  { name: ".clear",        desc: "Limpa a fila e para a reprodução" },
];

const aiCommands = [
  { name: ".chat <pergunta>", desc: "Envia uma pergunta para o modelo Llama 3.3 70B via Groq" },
];

const tabs = [
  { id: "music", icon: <Music2 size={15} />, label: "Música", commands: musicCommands },
  { id: "ai",    icon: <Bot size={15} />,    label: "IA",     commands: aiCommands },
];

function CommandTable({ commands }: { commands: { name: string; desc: string }[] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".9rem" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid var(--border)" }}>
          <th style={{ textAlign: "left", padding: ".6rem 1rem", color: "var(--muted)", fontSize: ".72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em" }}>
            Comando
          </th>
          <th style={{ textAlign: "left", padding: ".6rem 1rem", color: "var(--muted)", fontSize: ".72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em" }}>
            Descrição
          </th>
        </tr>
      </thead>
      <tbody>
        {commands.map(({ name, desc }) => (
          <tr key={name} className="cmd-row">
            <td style={{ padding: ".9rem 1rem", verticalAlign: "top" }}>
              <span style={{
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: ".84rem",
                color: "var(--violet)",
                background: "rgba(124,58,237,.12)",
                padding: ".22rem .55rem",
                borderRadius: 5,
                whiteSpace: "nowrap",
              }}>
                {name}
              </span>
            </td>
            <td style={{ padding: ".9rem 1rem", verticalAlign: "top", color: "var(--muted)" }}>
              {desc}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Commands() {
  const [active, setActive] = useState("music");

  return (
    <section id="comandos" style={{ padding: "5.5rem clamp(1rem, 6vw, 4rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader
          label="Comandos"
          title="Veja todos os comandos disponíveis"
          description={
            <>
              Prefixo padrão:{" "}
              <span style={{
                color: "var(--violet)",
                background: "rgba(124,58,237,.12)",
                padding: ".1rem .45rem",
                borderRadius: 4,
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: ".9em",
              }}>
                .
              </span>
            </>
          }
        />

        {/* macOS window */}
        <div style={{
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid var(--border)",
          boxShadow: "0 20px 60px rgba(0,0,0,.35)",
        }}>
          {/* title bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            padding: ".75rem 1rem",
            background: "rgba(255,255,255,.04)",
            borderBottom: "1px solid var(--border)",
          }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
          </div>

          {/* body: sidebar + content */}
          <div style={{ display: "flex", background: "rgba(255,255,255,.02)" }}>

            {/* sidebar tabs */}
            <div
              role="tablist"
              aria-orientation="vertical"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".25rem",
                padding: "1rem .75rem",
                borderRight: "1px solid var(--border)",
                minWidth: 120,
                background: "rgba(255,255,255,.02)",
              }}
            >
              {tabs.map(({ id, icon, label }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={active === id}
                  onClick={() => setActive(id)}
                  className={`tab${active === id ? " active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".45rem",
                    justifyContent: "flex-start",
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* content — grid overlap keeps height = tallest tab */}
            <div style={{ flex: 1, display: "grid" }}>
              {tabs.map(({ id, commands }) => (
                <div
                  key={id}
                  role="tabpanel"
                  aria-hidden={active !== id}
                  style={{
                    gridArea: "1 / 1",
                    visibility: active !== id ? "hidden" : "visible",
                    pointerEvents: active !== id ? "none" : "auto",
                  }}
                >
                  <CommandTable commands={commands} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

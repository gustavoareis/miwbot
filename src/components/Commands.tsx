"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";

const musicCommands = [
  { name: ".play <query>", desc: "Toca uma música ou adiciona à fila — YouTube, Spotify ou busca por texto" },
  { name: ".queue",        desc: "Exibe a fila atual e o que está tocando" },
  { name: ".skip",         desc: "Pula para a próxima música" },
  { name: ".pause",        desc: "Pausa a reprodução" },
  { name: ".resume",       desc: "Retoma a reprodução" },
  { name: ".stop",         desc: "Para a música atual" },
  { name: ".clear",        desc: "Limpa a fila e para a reprodução" },
  { name: ".leave",        desc: "Desconecta do canal de voz" },
];

const aiCommands = [
  { name: ".chat <pergunta>", desc: "Envia uma pergunta para o modelo Llama 3.3 70B via Groq" },
];

const tabs = [
  { id: "music", label: "🎵\u00a0 Música", commands: musicCommands },
  { id: "ai",    label: "🤖\u00a0 IA",     commands: aiCommands },
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
          title="Referência rápida"
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

        <div role="tablist" style={{
          display: "flex",
          gap: ".5rem",
          marginBottom: "1.5rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: ".6rem",
        }}>
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={active === id}
              onClick={() => setActive(id)}
              className={`tab${active === id ? " active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tabs.map(({ id, commands }) => (
          <div key={id} role="tabpanel" hidden={active !== id}>
            <CommandTable commands={commands} />
          </div>
        ))}
      </div>
    </section>
  );
}

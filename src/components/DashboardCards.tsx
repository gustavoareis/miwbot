"use client"

import Image from "next/image"
import { useState } from "react"
import { Search } from "lucide-react"
import { DiscordIcon } from "@/components/ui/icons"

interface Guild {
  id: string
  name: string
  icon: string | null
  owner: boolean
}

interface Props {
  guilds: Guild[]
  botClientId: string
  totalCount: number
}

function guildIconUrl(guild: Guild): string | null {
  if (!guild.icon) return null
  const ext = guild.icon.startsWith("a_") ? "gif" : "png"
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${ext}?size=128`
}

export default function DashboardCards({ guilds, botClientId, totalCount }: Props) {
  const [query, setQuery] = useState("")

  const filtered = query.trim()
    ? guilds.filter((g) => g.name.toLowerCase().includes(query.toLowerCase()))
    : guilds

  const botInviteUrl = (guildId: string) =>
    `https://discord.com/oauth2/authorize?client_id=${botClientId}&scope=bot+applications.commands&permissions=8&guild_id=${guildId}`

  return (
    <>
      {/* Search + stats */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1.5rem",
        animation: "riseIn .7s cubic-bezier(.22,1,.36,1) .1s both",
        flexWrap: "wrap",
      }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: "0.8rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--muted)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Buscar servidor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "0.55rem 0.9rem 0.55rem 2.2rem",
              color: "var(--text)",
              fontSize: "0.875rem",
              outline: "none",
              transition: "border-color .2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,.5)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
          {filtered.length}{query ? ` de ${totalCount}` : ""} servidor{totalCount !== 1 ? "es" : ""}
        </p>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "3rem",
            textAlign: "center",
          }}
        >
          {totalCount === 0 ? (
            <>
              <DiscordIcon size={40} />
              <p style={{ color: "var(--text)", marginTop: "1rem", fontWeight: 600 }}>
                Nenhum servidor encontrado
              </p>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.5rem" }}>
                Você precisa ter a permissão "Gerenciar Servidor" para adicionar bots.
              </p>
            </>
          ) : (
            <>
              <Search size={36} style={{ color: "var(--muted)", margin: "0 auto" }} />
              <p style={{ color: "var(--text)", marginTop: "1rem", fontWeight: 600 }}>
                Nenhum resultado para "{query}"
              </p>
            </>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {filtered.map((guild, i) => {
            const icon = guildIconUrl(guild)
            return (
              <div
                key={guild.id}
                className="feature-card"
                style={{
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  animation: `riseIn .6s cubic-bezier(.22,1,.36,1) ${0.15 + i * 0.07}s both`,
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
                  e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  {icon ? (
                    <Image
                      src={icon}
                      alt={guild.name}
                      width={48}
                      height={48}
                      style={{ borderRadius: 12, border: "1px solid var(--border)" }}
                      unoptimized
                    />
                  ) : (
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "rgba(88,101,242,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--discord)",
                        border: "1px solid var(--border)",
                        flexShrink: 0,
                      }}
                    >
                      {guild.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div style={{ overflow: "hidden" }}>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "var(--text)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {guild.name}
                    </p>
                    {guild.owner && (
                      <span
                        style={{
                          fontSize: "0.7rem",
                          background: "rgba(168,85,247,0.15)",
                          color: "var(--violet)",
                          borderRadius: 4,
                          padding: "0.1rem 0.4rem",
                          fontWeight: 600,
                        }}
                      >
                        Dono
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href={botInviteUrl(guild.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-discord"
                  style={{ width: "100%", justifyContent: "center", borderRadius: 8 }}
                >
                  <DiscordIcon />
                  Setup
                </a>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import DashboardCards from "@/components/DashboardCards"

interface DiscordGuild {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
}

const MANAGE_GUILD = BigInt(0x20)

function canManageGuild(permissions: string, owner: boolean): boolean {
  try {
    return owner || (BigInt(permissions) & MANAGE_GUILD) === MANAGE_GUILD
  } catch {
    return owner
  }
}

async function getGuilds(accessToken: string): Promise<DiscordGuild[]> {
  const res = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 0 },
  })
  if (!res.ok) return []
  return res.json()
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const guilds = await getGuilds(session.accessToken)
  const manageable = guilds.filter((g) => canManageGuild(g.permissions, g.owner))

  const botClientId = process.env.DISCORD_CLIENT_ID!

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "calc(var(--nav-h) + 2.5rem)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>

          <div style={{
            marginBottom: "2.5rem",
            animation: "riseIn .7s cubic-bezier(.22,1,.36,1) both",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "avatar"}
                  width={48}
                  height={48}
                  className="rounded-full"
                  style={{ border: "2px solid var(--discord)" }}
                />
              )}
              <div>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)" }}>
                  Olá, <span className="grad">{session.user?.name}</span>
                </h1>
                <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
                  Escolha um servidor para adicionar o Miwbot
                </p>
              </div>
            </div>
            <Link href="/" style={{ color: "var(--muted)", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
              ← Voltar ao site
            </Link>
          </div>

          <DashboardCards guilds={manageable} botClientId={botClientId} totalCount={manageable.length} />
        </div>
      </div>
    </>
  )
}

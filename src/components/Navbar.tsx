import Image from "next/image";
import Link from "next/link";
import { GitHubIcon, DiscordIcon } from "@/components/ui/icons";
import { GITHUB_URL } from "@/lib/constants";

const navLinks = [
  { href: "#home",     label: "Home" },
  { href: "#comandos", label: "Comandos" },
  { href: "#recursos", label: "Recursos" },
  { href: "#",         label: "Status" },
];

export default function Navbar() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-[999] flex items-center justify-between border-b border-[var(--border)]"
      style={{
        height: "var(--nav-h)",
        padding: "0 clamp(1rem, 4vw, 2.5rem)",
        background: "rgba(8, 8, 15, .8)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      <Link href="#home" className="flex items-center gap-2 text-[1.35rem] font-black tracking-[-0.5px]">
        <Image
          src="/miwbot-logo.png"
          alt="Miwbot logo"
          width={32}
          height={32}
          className="rounded-full object-cover border-2 border-violet"
        />
        <span className="grad">Miwbot</span>
      </Link>

      <ul className="hidden md:flex gap-[clamp(.75rem,2vw,1.75rem)] list-none">
        {navLinks.map(({ href, label }) => (
          <li key={label}>
            <Link href={href} className="nav-link">{label}</Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-2.5">
        <Link href={GITHUB_URL} target="_blank" rel="noopener"
          className="btn btn-ghost hidden md:inline-flex">
          <GitHubIcon /> GitHub
        </Link>
        <Link href="#" className="btn btn-discord">
          <DiscordIcon /> Adicionar ao Discord
        </Link>
      </div>
    </nav>
  );
}

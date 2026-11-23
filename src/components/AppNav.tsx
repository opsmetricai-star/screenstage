"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bell, CreditCard, FileCheck2, LayoutDashboard, MessageSquare, Settings, Users } from "lucide-react";

const items = [
  { href: "/app", label: "Overview", icon: LayoutDashboard }, { href: "/app/interviews", label: "AI Interviews", icon: MessageSquare },
  { href: "/app/assessments", label: "Assessments", icon: FileCheck2 }, { href: "/app/candidates", label: "Candidates", icon: Users },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 }, { href: "/app/notifications", label: "Notifications", icon: Bell },
  { href: "/app/billing", label: "Billing", icon: CreditCard }, { href: "/app/settings", label: "Settings", icon: Settings },
];

export function AppNav({ unread }: { unread: number }) {
  const path = usePathname();
  return (
    <nav className="flex lg:flex-col gap-1 text-[15px]">
      {items.map(({ href, label, icon: I }) => {
        const active = href === "/app" ? path === "/app" : path.startsWith(href);
        return (
          <Link key={href} href={href} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 whitespace-nowrap ${active ? "bg-brand-soft text-brand font-medium" : "text-soft hover:bg-tint"}`}>
            <I size={18} />{label}{label === "Notifications" && unread > 0 && <span className="ml-auto text-[11px] bg-brand text-white rounded-full px-1.5">{unread}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({ className = "", size = "md", href = "/" }: LogoProps) {
  const sizeClasses = {
    sm: {
      wrapper: "gap-2",
      icon: "h-8 w-8 rounded-lg",
      iconSvg: "h-4 w-4",
      title: "text-base font-bold",
      subtitle: "text-[10px]",
    },
    md: {
      wrapper: "gap-2.5",
      icon: "h-10 w-10 rounded-xl",
      iconSvg: "h-5 w-5",
      title: "text-lg font-black tracking-tight",
      subtitle: "text-[11px]",
    },
    lg: {
      wrapper: "gap-3",
      icon: "h-12 w-12 rounded-2xl",
      iconSvg: "h-6 w-6",
      title: "text-xl font-black tracking-tight",
      subtitle: "text-xs",
    },
  }[size];

  const content = (
    <div className={`inline-flex items-center ${sizeClasses.wrapper} ${className} group`}>
      <div
        className={`relative flex ${sizeClasses.icon} items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 text-amber-400 shadow-md shadow-amber-500/10 ring-1 ring-amber-400/30 transition-transform duration-300 group-hover:scale-105 group-hover:ring-amber-400/60`}
      >
        <UtensilsCrossed className={sizeClasses.iconSvg} />
      </div>

      <div className="flex flex-col">
        <span className={`leading-none text-neutral-900 ${sizeClasses.title}`}>
          Self Checkout
        </span>
        <span className={`font-semibold tracking-wider uppercase text-amber-600 ${sizeClasses.subtitle}`}>
          Totem de Restaurantes
        </span>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

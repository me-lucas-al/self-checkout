import Link from "next/link";

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
      mText: "text-base",
      title: "text-base font-bold",
      subtitle: "text-[10px]",
    },
    md: {
      wrapper: "gap-2.5",
      icon: "h-10 w-10 rounded-xl",
      mText: "text-xl",
      title: "text-lg font-black tracking-tight",
      subtitle: "text-[11px]",
    },
    lg: {
      wrapper: "gap-3",
      icon: "h-12 w-12 rounded-2xl",
      mText: "text-2xl",
      title: "text-xl font-black tracking-tight",
      subtitle: "text-xs",
    },
  }[size];

  const content = (
    <div className={`inline-flex items-center ${sizeClasses.wrapper} ${className} group`}>
      <div
        className={`relative flex ${sizeClasses.icon} items-center justify-center bg-gradient-to-br from-red-600 to-red-700 shadow-md shadow-red-500/20 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105`}
      >
        <span
          className={`font-black text-amber-400 font-serif leading-none select-none ${sizeClasses.mText}`}
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900 }}
        >
          M
        </span>
      </div>

      <div className="flex flex-col">
        <span className={`leading-none text-neutral-900 ${sizeClasses.title}`}>
          McDonald&apos;s
        </span>
        <span className={`font-semibold tracking-wider uppercase text-amber-600 ${sizeClasses.subtitle}`}>
          Self Checkout
        </span>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

import { ArrowIcon } from "@/components/ui/icons";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "accent" | "inverse";
  arrow?: "right" | "out" | false;
  className?: string;
};

const variants = {
  solid: "bg-ink text-paper hover:bg-ink-soft",
  outline: "bg-paper text-ink ring-1 ring-line hover:ring-faint",
  accent: "bg-gopher text-ink hover:bg-[#00c2f0]",
  inverse: "bg-paper text-ink hover:bg-mist",
};

export function Button({ href, children, variant = "solid", arrow = "right", className = "" }: ButtonProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-base font-semibold shadow-soft transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-float active:translate-y-0 ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowIcon
          direction={arrow}
          className={`size-4 transition-transform duration-300 ease-out-expo ${
            arrow === "out"
              ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              : "group-hover:translate-x-1"
          }`}
        />
      )}
    </a>
  );
}

export function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex size-2 ${className}`} aria-hidden="true">
      <span className="absolute inset-0 animate-ping-slow rounded-full bg-gopher" />
      <span className="relative size-2 rounded-full bg-gopher" />
    </span>
  );
}

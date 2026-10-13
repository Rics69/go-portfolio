export function StatusDot({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-flex size-2 rounded-full bg-gopher ${className}`} />;
}

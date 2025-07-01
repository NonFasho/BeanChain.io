export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-[var(--bean-card)] border rounded-2xl shadow-md p-6 ${className}`}
    >
      {children}
    </div>
  );
}
// components/Button.js
export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  ...props
}) {
  const base =
    "px-size-ms py-size-sm rounded-lg font-button text-button transition-colors w-full";

  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-secondary",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline:
      "border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
  };

  return (
    <button
      type={type}         // ✅ ensures submit works inside forms
      onClick={onClick}   // ✅ pass through click handler
      className={`${base} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}

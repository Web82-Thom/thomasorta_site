import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
import styles from "./Card.module.css";
import type { CardProps } from "./Card.types";

export default function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  const classes = [styles.card, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes} {...props}>
      {children}
    </article>
  );
}
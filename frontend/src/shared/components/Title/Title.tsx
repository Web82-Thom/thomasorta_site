import styles from "./Title.module.css";
import type { TitleProps } from "./Title.types";

export default function Title({
  children,
  as = "h2",
  align = "left",
  className = "",
  ...props
}: TitleProps) {
  const Heading = as;

  const classes = [
    styles.title,
    styles[align],
    styles[as],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Heading className={classes} {...props}>
      {children}
    </Heading>
  );
}
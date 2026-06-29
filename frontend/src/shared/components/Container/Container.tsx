import styles from "./Container.module.css";

import type { ContainerProps } from "./Container.types";

function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;
import React from "react";
import styles from "./About.module.scss";

export default function About() {
  return (
    <div className={styles.container}>
      <button className={styles["button-item"]}>Click me</button>
    </div>
  );
}

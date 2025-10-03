import React from "react";
import styles from "../../scss/styles/components/basic-loading.scss";

const SimpleLoader = ({
  size = "medium",
  color = "#2563eb",
  className = "",
}) => {
  return (
    <div className={`${styles.simpleLoader} ${styles[size]} ${className}`}>
      <div className={styles.spinner} style={{ borderColor: color }}></div>
    </div>
  );
};

export default SimpleLoader;

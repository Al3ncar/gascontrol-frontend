import React from "react";
import styles from "../../scss/styles/components/loading.module.scss";

const LogoLoader = ({
  logo = "/logo.png", // Altere para o caminho da sua logo
  size = "medium",
  backgroundColor = "rgba(255, 255, 255, 0.9)",
  className = "",
  showText = false,
  text = "Carregando...",
}) => {
  return (
    <div className={`${styles.logoLoader} ${styles[size]} ${className}`}>
      <div className={styles.loaderBackground}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <div className={styles.pulseRing}></div>
        </div>

        {showText && <div className={styles.loadingText}>{text}</div>}
      </div>
    </div>
  );
};

export default LogoLoader;

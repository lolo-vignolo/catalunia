import Image from "next/image";
import styles from "./header.module.css";
import globlaStyles from "../../app/page.module.css";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <img
        src="/images/pergaminoCorner.webp"
        alt="Prades"
        style={{
          zIndex: -1,

          width: "45%",
        }}
      />
      <h1 className={globlaStyles.title}>
        Auca de la creacio del comtat de les Muntanyes de Prades
      </h1>
      <Image src="/images/caballo.png" alt="Prades" width={300} height={300} />
    </div>
  );
};

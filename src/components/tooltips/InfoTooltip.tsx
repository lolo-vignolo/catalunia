import styles from "./infoTooltip.module.css";
export const InfoTooltip = ({ close }: { close: (value: boolean) => void }) => {
  return (
    <div className={styles.tooltipContainer}>
      <div>
        <p>
          Esta página web es un proyecto personal que nace de la pasión por la
          historia y la programación.
          <br />
          <br />
          En ella se recoge una pequeña parte de la historia de Prades, un
          municipio situado en la provincia de Tarragona, Catalunya.
          <br />
          <br />
          Si te ha gustado la página y quieres saber más sobre la historia de
          Prades, puedes visitar la página web oficial del municipio.
        </p>
      </div>

      <button className={styles.tooltipClose} onClick={() => close(false)}>
        Cerrar
      </button>
    </div>
  );
};

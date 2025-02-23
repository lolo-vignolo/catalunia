import { motion } from "framer-motion";
import React from "react";

const ScrollPage = () => {
  return (
    <div style={styles.wrapper}>
      {/* Palos de pergamino (arriba) */}
      <div style={styles.scrollBarTop} />

      {/* Pergamino animado */}
      <motion.div
        initial={{
          scaleY: 0, // Comienza cerrado
          opacity: 0.5, // Ligera transparencia al inicio
          transformOrigin: "center", // Se expande desde el centro
        }}
        animate={{
          scaleY: 1, // Se expande completamente
          opacity: 1, // Aparece totalmente
        }}
        transition={{ duration: 2, ease: "easeInOut" }} // Animación suave
        style={styles.scrollBody}
      >
        <h1 style={styles.text}>📜 ¡Bienvenido al pergamino! 📜</h1>
      </motion.div>

      {/* Palos de pergamino (abajo) */}
      <div style={styles.scrollBarBottom} />
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  scrollBody: {
    backgroundImage: "url('/images/pergamino.png')", // Imagen del pergamino
    backgroundSize: "contain", // Ajustar sin distorsión
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center", // Centrar la imagen
    width: "60vw",
    maxWidth: "500px",
    padding: "20px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)", // Sombra para realismo
    overflow: "hidden", // Evita que el contenido se vea antes de abrirse
  },
  text: {
    fontFamily: "'Papyrus', fantasy", // Fuente estilo pergamino
    fontSize: "1.5rem",
  },
  scrollBarTop: {
    width: "64vw",
    maxWidth: "520px",
    height: "30px",
    borderRadius: "15px",
  },
  scrollBarBottom: {
    width: "64vw",
    maxWidth: "520px",
    height: "30px",
    borderRadius: "15px",
    marginTop: "-15px", // Ajuste para que se vea mejor
  },
};

export default ScrollPage;

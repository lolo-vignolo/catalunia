import { useState, useEffect } from "react";
import styles from "./modal.module.css";
import Confetti from "react-confetti";

interface ModalProps {
  setShowModal: (showModal: boolean) => void;
  children: React.ReactNode;
  showModal: boolean;
}

export const Modal = ({ setShowModal, showModal, children }: ModalProps) => {
  const [amount, setAmount] = useState<number>(0);

  // contar cuantas cartas se han escaneado
  useEffect(() => {
    if (typeof window !== "undefined") {
      const amountOfCards = localStorage.getItem("amount");
      const amount = parseInt(amountOfCards || "0");
      setAmount(amount);
    }
  }, []); // Empty dependency array to run only once after initial render

  return (
    <>
      <div
        className={styles.modal}
        style={{ display: showModal ? "flex" : "none" }}
      >
        <Confetti
          width={1920}
          height={1080}
          numberOfPieces={200}
          friction={0.99}
          wind={0}
          gravity={0.1}
          initialVelocityX={4}
          initialVelocityY={10}
          colors={["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]}
          opacity={1}
          recycle={true}
          run={true}
        />
        <div className={styles.modalContent}>
          <h2>¡Felicidades!</h2>
          <p>Has conseguido un nuevo token</p>
          <p>Tienes {amount + 1} tokens de un total de 40!</p>
          <div>
            <button
              className={styles.closeButton}
              onClick={() => {
                setShowModal(false);
              }}
            >
              close
            </button>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

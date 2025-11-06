// "use client";
// import styles from "./page.module.css";
// import { Card } from "@/components/Card/Card";
// import { cardsData } from "@/data/cardData";
// import { Suspense, useEffect, useState } from "react";

// import { Header } from "@/components/Header/Header";
// import { Navbar } from "@/components/Navbar/Navbar";
// import { Footer } from "@/components/Footer/Footer";
// import { Flourish, FlourishAlt } from "@/svg/Flourish";
// import { Modal } from "@/components/Modal/Modal";

// export default function Home() {
//   const [showModal, setShowModal] = useState(false);
//   const [listOfAllowedCards, setListOfAllowedCards] = useState<
//     string[] | undefined
//   >([]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const passwordsSaved = localStorage.getItem("qr-list");
//       if (passwordsSaved) {
//         const listOfPasswords = passwordsSaved.split(",");
//         setListOfAllowedCards(listOfPasswords);
//       }
//     }
//   }, []);

//   return (
//     <Modal setShowModal={setShowModal} showModal={showModal}>
//       <main className={styles.main}>
//         <Navbar />
//         <div className={styles.mainContainer}>
//           <img
//             src="/images/pergaminoCorner.webp"
//             alt="Prades"
//             className={styles.imageBg}
//           />
//           <Header />
//           <div className={styles.flourishContainer}>
//             <Flourish />
//           </div>
//           <div className={styles.cardsContainer}>
//             {cardsData.map((card) => {
//               const isAllowwed = listOfAllowedCards?.includes(card.passwordImg);
//               const isFocused =
//                 listOfAllowedCards?.[listOfAllowedCards.length - 1] ===
//                 card.passwordImg;

//               return (
//                 <Suspense key={card.id} fallback={<div>Loading...</div>}>
//                   <Card
//                     card={card}
//                     isAllowwed={isAllowwed}
//                     isFocused={isFocused}
//                   />
//                 </Suspense>
//               );
//             })}
//             <FlourishAlt />
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </Modal>
//   );
// }
"use client";
import styles from "./page.module.css";
import { Card } from "@/components/Card/Card";
import { cardsData } from "@/data/cardData";
import { Suspense, useEffect, useState } from "react";

import { Header } from "@/components/Header/Header";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Flourish, FlourishAlt } from "@/svg/Flourish";
import { Modal } from "@/components/Modal/Modal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [listOfAllowedCards, setListOfAllowedCards] = useState<
    string[] | undefined
  >([]);

  // Función para actualizar la lista desde localStorage
  const updateAllowedCards = () => {
    if (typeof window !== "undefined") {
      const passwordsSaved = localStorage.getItem("qr-list");
      if (passwordsSaved) {
        const listOfPasswords = passwordsSaved.split(",").filter(id => id.trim());
        setListOfAllowedCards(listOfPasswords);
      } else {
        setListOfAllowedCards([]);
      }
    }
  };

  useEffect(() => {
    // Cargar inicial
    updateAllowedCards();

    // Escuchar cuando la página se vuelve visible (regreso del escaneo)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateAllowedCards();
      }
    };

    // Escuchar cuando la ventana recibe focus
    const handleFocus = () => {
      updateAllowedCards();
    };

    // Escuchar cambios en localStorage (para otros tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'qr-list') {
        updateAllowedCards();
      }
    };

    // Agregar listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorageChange);

    // Para Safari: también verificar periódicamente
    const interval = setInterval(() => {
      if (!document.hidden) {
        updateAllowedCards();
      }
    }, 1000);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.mainContainer}>
          <img
            src="/images/pergaminoCorner.webp"
            alt="Prades"
            className={styles.imageBg}
          />
          <Header />
          <div className={styles.flourishContainer}>
            <Flourish />
          </div>
          <div className={styles.cardsContainer}>
            {cardsData.map((card) => {
              const isAllowwed = listOfAllowedCards?.includes(card.passwordImg);
              const isFocused =
                listOfAllowedCards?.[listOfAllowedCards.length - 1] ===
                card.passwordImg;

              return (
                <Suspense key={card.id} fallback={<div>Loading...</div>}>
                  <Card
                    card={card}
                    isAllowwed={isAllowwed}
                    isFocused={isFocused}
                  />
                </Suspense>
              );
            })}
            <FlourishAlt />
          </div>
        </div>
      </main>
      <Footer />
    </Modal>
  );
}
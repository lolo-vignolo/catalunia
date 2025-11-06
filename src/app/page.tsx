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
import { Suspense, useEffect, useState, useCallback } from "react";

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
  const updateAllowedCards = useCallback(() => {
    if (typeof window !== "undefined") {
      const passwordsSaved = localStorage.getItem("qr-list");
      if (passwordsSaved) {
        const listOfPasswords = passwordsSaved.split(",").filter(id => id.trim());
        setListOfAllowedCards(prev => {
          // Solo actualizar si hay cambios
          if (JSON.stringify(prev) !== JSON.stringify(listOfPasswords)) {
            console.log('📱 iPhone: Cards updated', listOfPasswords);
            return listOfPasswords;
          }
          return prev;
        });
      } else {
        setListOfAllowedCards([]);
      }
    }
  }, []);

  useEffect(() => {
    // Cargar inicial
    updateAllowedCards();

    // Para iPhone Safari: múltiples estrategias
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(updateAllowedCards, 100);
      }
    };

    const handleFocus = () => {
      setTimeout(updateAllowedCards, 100);
    };

    const handlePageShow = () => {
      setTimeout(updateAllowedCards, 100);
    };

    const handleTouchStart = () => {
      updateAllowedCards();
    };

    // Event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Intervalo más frecuente para iPhone
    const interval = setInterval(() => {
      if (!document.hidden) {
        updateAllowedCards();
      }
    }, 300);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('touchstart', handleTouchStart);
      clearInterval(interval);
    };
  }, [updateAllowedCards]);

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
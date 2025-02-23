"use client"; // Para Next.js con App Router
import CardPrePage from "@/prepages/CardPrePage";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PaperBackground = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 500);
  }, []);

  return (
    <motion.div
      initial={{
        scaleY: 0,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 5%, 0% 5%)",
        opacity: 0.7,
        borderRadius: "50px 50px 10px 10px",
        boxShadow: "0px 15px 40px rgba(0,0,0,0.5)",
        rotate: -2,
      }}
      animate={{
        scaleY: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        borderRadius: "20px",
        boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
        rotate: 0,
        transition: {
          duration: 2,
          ease: [0.25, 1, 0.5, 1],
        },
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        transformOrigin: "top",
        backgroundImage: "url('/images/pergamino.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
      }}
    >
      {/* Contenido del pergamino */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 1 } }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "#3a2d1f",
          fontSize: "24px",
          fontWeight: "bold",
          textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
          padding: "20px",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PaperBackground;

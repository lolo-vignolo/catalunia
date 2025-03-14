import { cardsData } from "@/data/cardData";
import Image from "next/image";
import style from "./footer.module.css";

const sliderData = [
  "Oficines de Turisme del territori",
  "Llibreria Gaudí (Reus)",
  "Qui’k Discs (Reus)",
  "Castell de Falset – Museu Comarcal",
  "Estanc Espasa (Cornudella de Montsant)",
];

export const Footer = () => {
  return (
    <footer className={style.footer}>
      {/* Mobile version */}
      <div className={style.footerInnerContainer}>
        <div className={style.imagesContainer}>
          <img src="/images/footer/portadaVioleta.webp" alt="Prades" />
          <img src="/images/footer/portadaMarron.webp" alt="Prades" />
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <h1 style={{ fontSize: "1.2rem", textAlign: "center" }}>
            Pots adquirir els llibrets commemoratius del centenari a:
          </h1>
        </div>

        <div className={style.columnTouns}>
          <div className={style.slider}>
            {sliderData.map((title, index) => (
              <span key={index} style={{ marginRight: "2rem" }}>
                <h2 key={index}>{title}</h2>
              </span>
            ))}
            {sliderData.map((title, index) => (
              <span key={index} style={{ marginRight: "2rem" }}>
                <h2 key={index}>{title}</h2>
              </span>
            ))}
          </div>
        </div>
        <div>
          <Image
            src="/images/logoAniversary.png"
            alt="Prades"
            width={200}
            height={200}
          />
        </div>
      </div>

      <div className={style.media}>
        <p>© 2025 set-cents anys comtat de les Muntanyes de Prades</p>
      </div>
    </footer>
  );
};

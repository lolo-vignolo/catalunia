import { cardsData } from "@/data/cardData";
import Image from "next/image";
import style from "./footer.module.css";
export const Footer = () => {
  const firstColumn = cardsData.slice(0, cardsData.length / 4);
  const secondColumn = cardsData.slice(
    cardsData.length / 4,
    cardsData.length / 2
  );
  const thirdColumn = cardsData.slice(
    cardsData.length / 2,
    (cardsData.length / 4) * 3
  );

  const fourthColumn = cardsData.slice(
    (cardsData.length / 4) * 3,
    cardsData.length
  );

  return (
    <footer className={style.footer}>
      <div className={style.footerInnerContainer}>
        <div>
          <h1>Prades:</h1>

          <div className={style.columnTouns}>
            <div>
              {firstColumn.map((card) => {
                return (
                  <ul key={card.id}>
                    <li>{card.title}</li>
                  </ul>
                );
              })}
            </div>
            <div>
              {secondColumn.map((card) => {
                return (
                  <ul key={card.id}>
                    <li>{card.title}</li>
                  </ul>
                );
              })}
            </div>
            <div>
              {thirdColumn.map((card) => {
                return (
                  <ul key={card.id}>
                    <li>{card.title}</li>
                  </ul>
                );
              })}
            </div>
            <div>
              {fourthColumn.map((card) => {
                return (
                  <ul key={card.id}>
                    <li>{card.title}</li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <Image
            src="/images/caballo.png"
            alt="Prades"
            width={200}
            height={200}
          />
        </div>
      </div>

      <p>© 2021 setcents comtat prades</p>
    </footer>
  );
};

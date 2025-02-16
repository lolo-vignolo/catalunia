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
      {/* Mobile version */}
      <div className={style.footerInnerContainer}>
        <h1>Prades:</h1>
        <div className={style.columnTouns}>
          <div className={style.slider}>
            {cardsData.map((card, index) => (
              <span key={index} style={{ marginRight: "2rem" }}>
                <h1>{card.title}</h1>
              </span>
            ))}
            {cardsData.map((card, index) => (
              <span
                key={cardsData.length + index}
                style={{ marginRight: "2rem" }}
              >
                <h1>{card.title}</h1>
              </span>
            ))}
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

      {/* version desktop */}

      <div className={style.footerInnerContainerDesktop}>
        <h1>Prades:</h1>
        <div className={style.columnTounsDesktop}>
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
        <div className={style.footerImgDesktop}>
          <Image
            src="/images/caballo.png"
            alt="Prades"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className={style.media}>
        <p>© 2021 setcents comtat prades</p>
        <div className={style.socialMedia}>
          <a href="#">
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

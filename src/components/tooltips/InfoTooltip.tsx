import { useState } from "react";
import styles from "./infoTooltip.module.css";
import { title } from "process";
export const InfoTooltip = ({ close }: { close: (value: boolean) => void }) => {
  const [lang, setLang] = useState<"ca" | "es" | "en">("ca");
  return (
    <div className={styles.tooltipContainer}>
      <div>
        <h1>
          {lang === "ca" ? ca.title : lang === "es" ? es.title : en.title}
        </h1>
        <br />
        <p>{lang === "ca" ? ca.text : lang === "es" ? es.text : en.text}</p>
        <br />
        <h4>
          {" "}
          {lang === "ca"
            ? ca.howToPlay
            : lang === "es"
              ? es.howToPlay
              : en.howToPlay}
        </h4>{" "}
        <br />
        <p>{lang === "ca" ? ca.step1 : lang === "es" ? es.step1 : en.step1}</p>
        <br />
        <p>{lang === "ca" ? ca.step2 : lang === "es" ? es.step2 : en.step2}</p>
        <br />
        <p> {lang === "ca" ? ca.step3 : lang === "es" ? es.step3 : en.step3}</p>
        <br />
        <p> {lang === "ca" ? ca.step4 : lang === "es" ? es.step4 : en.step4}</p>
        <br />
        <h3>
          {" "}
          {lang === "ca"
            ? ca.objective
            : lang === "es"
              ? es.objective
              : en.objective}
        </h3>{" "}
        <br />
        <p>
          {" "}
          {lang === "ca"
            ? ca.objectiveText
            : lang === "es"
              ? es.objectiveText
              : en.objectiveText}
        </p>
        <br />
        <h3>
          {" "}
          {lang === "ca" ? ca.prize : lang === "es" ? es.prize : en.prize}
        </h3>
        <br />
        <p>
          {" "}
          {lang === "ca"
            ? ca.prizeText
            : lang === "es"
              ? es.prizeText
              : en.prizeText}
        </p>
        <br />
        <h3>
          {" "}
          {lang === "ca" ? ca.ready : lang === "es" ? es.ready : en.ready}
        </h3>{" "}
        <br />
        <p>
          {" "}
          {lang === "ca"
            ? ca.readyText
            : lang === "es"
              ? es.readyText
              : en.readyText}
        </p>
      </div>
      <div>
        <div className={styles.tooltipLang}>
          <button className={styles.btnLang} onClick={() => setLang("ca")}>
            Ca
          </button>
          <button className={styles.btnLang} onClick={() => setLang("es")}>
            Es
          </button>
          <button className={styles.btnLang} onClick={() => setLang("en")}>
            En
          </button>
        </div>
        <button className={styles.tooltipClose} onClick={() => close(false)}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

const ca = {
  title: "🎉 Benvinguts a la gran aventura dels Prades! 🎉 ",
  text: "Celebrem els 700 anys dels Comtats dels Muntanyesos de Prades, i per això us hem preparat un joc èpic perquè descobriu la seva història mentre us divertiu!",
  howToPlay: "🗺️ Com jugar?",
  step1: "1️⃣ Viatja pels diferents municipis que formen part dels Prades.",
  step2: "2️⃣ En llocs estratègics, trobaràs codis QR ocults.",
  step3:
    "3️⃣ Escaneja cada codi QR amb el teu mòbil i desbloquejaràs una imatge secreta i un fragment de la història dels Prades!",
  step4:
    "4️⃣ Cada QR et donarà accés a un pergamí digital, amb una imatge i una explicació fascinant.",
  objective: "🔎 Objectiu del joc",
  objectiveText:
    "A la pàgina principal veuràs 20 cartes per descobrir. Sota cadascuna, trobaràs el nom del Prade on s’amaga el QR. Fes clic al nom i segueix el mapa misteriós per trobar-lo!",
  prize: "🏆 El gran premi!",
  prizeText:
    "Els 50 primers aventurers que descobreixin tots els 20 QR rebran un diploma oficial de descobridor i un llibre amb tota la història dels Prades! 📖🏅",
  ready: "💡 Esteu preparats?",
  readyText: "Molta sort i… a buscar sense parar! 🏃‍♂️🎯",
};

const es = {
  title: "🎉 ¡Bienvenidos a la gran aventura de los Prades! 🎉",
  text: "¡Celebramos los 700 años de los Condados de los Montañeses de Prades, y por eso os hemos preparado un juego épico para que descubráis su historia mientras os divertís!",
  howToPlay: "🗺️ ¿Cómo jugar?",
  step1:
    "1️⃣ Viaja por los diferentes municipios que forman parte de los Prades.",
  step2: "2️⃣ En lugares estratégicos, encontrarás códigos QR ocultos.",
  step3:
    "3️⃣ Escanea cada código QR con tu móvil y desbloquearás una imagen secreta y un fragmento de la historia de los Prades!",
  step4:
    "4️⃣ Cada QR te dará acceso a un pergamino digital, con una imagen y una explicación fascinante.",
  objective: "🔎 Objetivo del juego",
  objectiveText:
    "En la página principal verás 20 cartas por descubrir. Bajo cada una, encontrarás el nombre del Prade donde se esconde el QR. ¡Haz clic en el nombre y sigue el mapa misterioso para encontrarlo!",
  prize: "🏆 ¡El gran premio!",
  prizeText:
    "¡Los 50 primeros aventureros que descubran todos los 20 QR recibirán un diploma oficial de descubridor y un libro con toda la historia de los Prades! 📖🏅",
  ready: "💡 ¿Estáis preparados?",
  readyText: "¡Mucha suerte y… a buscar sin parar! 🏃‍♂️🎯",
};

const en = {
  title: "🎉 Welcome to the great adventure of the Prades! 🎉",
  text: "We celebrate the 700 years of the Counties of the Montañeses de Prades, and that's why we have prepared an epic game for you to discover their history while having fun!",
  howToPlay: "🗺️ How to play?",
  step1:
    "1️⃣ Travel through the different municipalities that are part of the Prades.",
  step2: "2️⃣ In strategic places, you will find hidden QR codes.",
  step3:
    "3️⃣ Scan each QR code with your mobile and you will unlock a secret image and a fragment of the history of the Prades!",
  step4:
    "4️⃣ Each QR will give you access to a digital parchment, with a fascinating image and explanation.",
  objective: "🔎 Game objective",
  objectiveText:
    "On the main page you will see 20 cards to discover. Under each one, you will find the name of the Prade where the QR is hidden. Click on the name and follow the mysterious map to find it!",
  prize: "🏆 The grand prize!",
  prizeText:
    "The first 50 adventurers who discover all 20 QR codes will receive an official discovery diploma and a book with the entire history of the Prades! 📖🏅",
  ready: "💡 Are you ready?",
  readyText: "Good luck and... keep looking! 🏃‍♂️🎯",
};

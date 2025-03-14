import styles from "./infoTooltip.module.css";
export const InfoTooltip = ({ close }: { close: (value: boolean) => void }) => {
  return (
    <div className={styles.tooltipContainer}>
      <div>
        <h1>{ca.title}</h1>
        <br />
        <p>{ca.text}</p>
        <br />
        <h4> {ca.howToPlay}</h4> <br />
        <p>{ca.step1}</p>
        <br />
        <p>{ca.step2}</p>
        <br />
        <p> {ca.step3}</p>
        <br />
        <p> {ca.step4}</p>
        <br />
        <h3> {ca.objective} </h3>
        <p> {ca.objectiveText}</p>
        <br />
        <h3> {ca.prize}</h3>
        <br />
        <p> {ca.prizeText}</p>
        <br />
        <h3> {ca.ready}</h3> <br />
        <p> {ca.readyText}</p>
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

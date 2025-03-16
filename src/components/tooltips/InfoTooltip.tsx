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
        <h3> {ca.ready}</h3> <br />
        <p> {ca.readyText}</p>
      </div>

      <button className={styles.tooltipClose} onClick={() => close(false)}>
        <p>X</p>
      </button>
    </div>
  );
};

const ca = {
  title:
    "🏰 Viu l’èpica aventura dels 700 anys del comtat de les Muntanyes de Prades! 🎉 ",
  text: "Enguany celebrem el 7è centenari de la creació del comtat de les Muntanyes de Prades i la seva annexió amb la baronia d’Entença. Aprofita l’efemèride per conèixer els indrets que havien format part d’aquest important senyoriu tot jugant. ",
  howToPlay: "🗺️ Com s’hi juga? ",
  step1:
    "1️⃣ Escull un poble del mapa (si vols completar l’auca, hauràs d’anar a Siurana, Prades i Falset, les capitals històriques del comtat, mentre que la resta de cromos els podràs obtenir en dos llocs diferents, indicats amb un mateix color)",
  step2: "2️⃣ En llocs estratègics, trobaràs codis QR ocults.",
  step3:
    "3️⃣ Escaneja amb el teu mòbil el codi QR que veuràs al costat de cada cavaller i se’t desbloquejarà una imatge secreta i el text de cada vinyeta (aquests codis et donaran accés a un pergamí digital i així aniràs descobrint els fragments de la fascinant història dels orígens del comtat)",
  step4:
    "4️⃣ Completa la teva col·lecció de cromos virtuals que configuren l’auca.",
  objective: "🔎 Objectiu del joc",
  objectiveText:
    "A la pàgina principal veuràs 20 cromos per descobrir. A sota de cada imatge hi consta el nom del poble on s’amaga el cavaller i el respectiu codi QR. Fes click al nom de cada lloc i segueix el mapa per trobar-lo. Quan ja tinguis el teu cromo, aprofita per passejar, visitar el patrimoni, contemplar el paisatge, gaudir de la gastronomia local... ",
  ready: "💡 Esteu preparats i preparades?",
  readyText:
    "Molta sort i... a buscar sense parar!. Descobreix i gaudeix de tot el que l’antic comtat de les Muntanyes de Prades us pot oferir 🏃‍♂️🎯",
};

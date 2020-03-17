export type Symptoms = {
  feverInCelsius: number
  dryCough: number
  fatigue: number,
  sputumProduction: number,
  shortnessOfBreath: number,
  musclePainOrJointPain: number,
  soreThroat: number,
  headache: number,
  chills: number,
  nauseaOrVomiting: number,
  nasalCongestion: number,
  diarrhoea: number,
  haemoptysis: number,
  conjunctivalCongestion: number,
  other: Map<string, number>,
}

// import EventInfo from "./EventInfo";

// export default class PersonSymptomsEvent {
//   constructor(
//     readonly eventInfo: EventInfo,
//     readonly feverInCelsius: number,
//     readonly dryCough: number,
//     readonly fatigue: number,
//     readonly sputumProduction: number,
//     readonly shortnessOfBreath: number,
//     readonly musclePainOrJointPain: number,
//     readonly soreThroat: number,
//     readonly headache: number,
//     readonly chills: number,
//     readonly nauseaOrVomiting: number,
//     readonly nasalCongestion: number,
//     readonly diarrhoea: number,
//     readonly haemoptysis: number,
//     readonly conjunctivalCongestion: number,
//     readonly other: Map<string, number>) {}
// }

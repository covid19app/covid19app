export type Symptoms = {
  personId: string
  feverInCelsius: number
  dryCough: number
  fatigue: number
  sputumProduction: number
  shortnessOfBreath: number
  musclePainOrJointPain: number
  soreThroat: number
  headache: number
  chills: number
  nauseaOrVomiting: number
  nasalCongestion: number
  diarrhoea: number
  haemoptysis: number
  conjunctivalCongestion: number
  other: Map<string, number>
}

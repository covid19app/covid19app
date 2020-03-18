// export enum Action {
//   UNKNOWN, STAY_HEALTHY, GET_TESTED, SELF_QUARANTINE, CALL_DOCTOR, GO_TO_HOSPITAL
// }

export type NextSteps = {
  // action: Action
  action: string
  html?: string
  externalLink?: string
}

export enum Sex {
  UNKNOWN, MALE, FEMALE, NON_BINARY
}

export type SexStrings = keyof typeof Sex

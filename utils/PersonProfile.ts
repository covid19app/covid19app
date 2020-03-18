import { Sex } from './Sex';

export type PersonProfile = {
  personId: string
  name: string
  age: number
  sex: Sex
  deleted: boolean
}

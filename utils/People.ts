import * as React from 'react';
import { AsyncStorage } from 'react-native';

import Config from '../constants/Config';
import { PersistanceKey } from './Persistance';

export async function loadDefaultPersonId(): Promise<string> {
  return await AsyncStorage.getItem(PersistanceKey.DEFAULT_PERSON_ID)
}

export async function saveDefaultPersonId(personId: string) {
  await AsyncStorage.setItem(PersistanceKey.DEFAULT_PERSON_ID, personId)
}

export const PersonIdContext = React.createContext(undefined as string);

export function getPersonUrl(personId: string): string {
  return `${Config.apiServerUrl}/v1/person/${personId}`
}

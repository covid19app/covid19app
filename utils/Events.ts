import { AsyncStorage } from 'react-native';

import uuid from 'react-native-uuid';

import EventInfo from './EventInfo';
import { PersistanceKey } from './Persistance';

var cachedDeviceId: string = undefined

export async function loadOrCreateDeviceId(): Promise<string> {
  cachedDeviceId = await AsyncStorage.getItem(PersistanceKey.DEVICE_ID)
  if (!cachedDeviceId) {
    cachedDeviceId = generateDeviceId()
    await AsyncStorage.setItem(PersistanceKey.DEVICE_ID, cachedDeviceId)
  }
  return cachedDeviceId
}


function generateId(prefix: String): string {
  return `${prefix}__${uuid.v4()}`
}

export function generateDeviceId(): string {
  return generateId('device')
}

export function generatePersonId(): string {
  return generateId('person')
}

export function generateEventId(): string {
  return generateId('event')
}

export function generateTestId(): string {
  return generateId('test')
}

export function generateEventInfo(): EventInfo {
  return new EventInfo(generateEventId(), cachedDeviceId, Date.now())
}

import { AsyncStorage } from 'react-native';

import uuid from 'react-native-uuid';

import EventInfo from './EventInfo';

var cachedDeviceId: string = undefined

export async function loadOrCreateDeviceId(): Promise<string> {
  cachedDeviceId = await AsyncStorage.getItem('deviceId')
  if (cachedDeviceId === null) {
    cachedDeviceId = generateDeviceId()
    await AsyncStorage.setItem('deviceId', cachedDeviceId)
  }
  return cachedDeviceId
}



function generateId(prefix: String): string {
  return `${prefix}_${uuid.v4()}`
}

export function generateDeviceId(): string {
  return generateId("device")
}

export function generatePersonId(): string {
  return generateId("person")
}

export function generateEventId(): string {
  return generateId("event")
}

export function generateTestId(): string {
  return generateId("test")
}

export function generateEventInfo(personId: string): EventInfo {
  return new EventInfo(generateEventId(), personId, cachedDeviceId, Date.now())
}

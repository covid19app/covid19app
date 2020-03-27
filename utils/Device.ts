import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { getCurrentLocale, t, tkeys } from './i18n';
import { generateDeviceId, generatePersonId } from './Ids';
import { DeviceEntity } from './schema';
import { PersonEntity } from './schema';

const DEVICE_ENTITY_KEY = 'DEVICE_ENTITY'

let cachedDeviceEntity: DeviceEntity

export async function loadOrCreateDeviceEntity(): Promise<DeviceEntity> {
  cachedDeviceEntity = JSON.parse(await AsyncStorage.getItem(DEVICE_ENTITY_KEY))
  if (!cachedDeviceEntity) {
    cachedDeviceEntity = {deviceId: generateDeviceId()}
    saveDeviceEntity(cachedDeviceEntity)
  }
  return cachedDeviceEntity
}

export async function saveDeviceEntity(deviceEntity: DeviceEntity): Promise<void> {
  cachedDeviceEntity = deviceEntity
  await AsyncStorage.setItem(DEVICE_ENTITY_KEY, JSON.stringify(deviceEntity))
}

export function getDeviceEntity(): DeviceEntity {
  return cachedDeviceEntity
}

interface PersonEntityContextContent {
  personEntity: PersonEntity
  setPersonEntity: (personEntity: PersonEntity) => void
}

export const PersonEntityContext = React.createContext<PersonEntityContextContent>(undefined)

export async function loadPersonEntity(personId: string): Promise<PersonEntity> {
  return JSON.parse(await AsyncStorage.getItem(personId))
}

// TODO: This will nto scale with all the events!
export async function loadAllPersonEntities(): Promise<PersonEntity[]> {
  const allKeys = await AsyncStorage.getAllKeys()
  const peopleKeys = allKeys.filter(k => k.startsWith('person'))
  const people = await AsyncStorage.multiGet(peopleKeys)
  return people.map(([personId, personEntityString], index) => JSON.parse(personEntityString))
}

export async function savePersonEntity(personEntity: PersonEntity): Promise<void> {
  await AsyncStorage.setItem(personEntity.personId, JSON.stringify(personEntity))
}

export function createFreshPersonEntity(): PersonEntity {
  const freshPersonEntity: PersonEntity = {
    personId: generatePersonId(),
    deviceId: getDeviceEntity().deviceId,
    name: t(tkeys.generic_DefaultPersonName),
    locale: getCurrentLocale(),
  }
  return freshPersonEntity
}

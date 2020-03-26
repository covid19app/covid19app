import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { generateDeviceId } from './Ids';

const DEVICE_INFO_KEY = 'DEVICE_INFO'

export interface DeviceInfo {
  deviceId: string
  pushNotificationToken?: string
  defaultPersonId?: string
}

let cachedDeviceInfo: DeviceInfo

export const PersonIdContext = React.createContext<string>(undefined)

export async function loadOrCreateDeviceInfo(): Promise<DeviceInfo> {
  cachedDeviceInfo = JSON.parse(await AsyncStorage.getItem(DEVICE_INFO_KEY))
  if (!cachedDeviceInfo) {
    cachedDeviceInfo = {deviceId: generateDeviceId()}
    saveDeviceInfo(cachedDeviceInfo)
  }
  return cachedDeviceInfo
}

export async function saveDeviceInfo(deviceInfo: DeviceInfo): Promise<void> {
  cachedDeviceInfo = deviceInfo
  await AsyncStorage.setItem(DEVICE_INFO_KEY, JSON.stringify(deviceInfo))
}

export function getDeviceInfo(): DeviceInfo {
  return cachedDeviceInfo
}

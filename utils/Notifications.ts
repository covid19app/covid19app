import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { DeviceInfo, getDeviceInfo, saveDeviceInfo } from './Device';
import { publishEvent } from './Events';
import { DeviceNotificationEvent } from './schema';

export async function registerForPushNotificationsAsync(): Promise<DeviceInfo> {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  if (status !== 'granted') {
    alert('No notification permissions!')
    return
  }

  const deviceInfo = getDeviceInfo()
  const pushNotificationToken = await Notifications.getExpoPushTokenAsync()

  const updatedDeviceInfo: DeviceInfo = {...deviceInfo, pushNotificationToken}
  const deviceNotificationEvent: DeviceNotificationEvent = {
    deviceId: deviceInfo.deviceId,
    pushNotificationToken
  }
  await Promise.all([
    saveDeviceInfo(updatedDeviceInfo),
    publishEvent(`/v1/device/${deviceInfo.deviceId}/notification`, deviceNotificationEvent),
  ])
  return updatedDeviceInfo
}

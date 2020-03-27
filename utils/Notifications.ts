import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { getDeviceEntity, saveDeviceEntity } from './Device';
import { publishEvent } from './Events';
import { DeviceEntity, DeviceNotificationEvent } from './schema';

export async function registerForPushNotificationsAsync(): Promise<DeviceEntity> {
  const deviceEntity = getDeviceEntity()
  if (deviceEntity.pushNotificationToken) {
    // We already have the token. We have nothing more to send.
    return deviceEntity
  }

  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  if (status !== 'granted') {
    alert('No notification permissions!')
    return
  }

  const pushNotificationToken = await Notifications.getExpoPushTokenAsync()

  const updatedDeviceEntity: DeviceEntity = {...deviceEntity, pushNotificationToken}
  const deviceNotificationEvent: DeviceNotificationEvent = {
    deviceId: deviceEntity.deviceId,
    pushNotificationToken
  }
  await Promise.all([
    saveDeviceEntity(updatedDeviceEntity),
    publishEvent(`/v1/device/${deviceEntity.deviceId}/notification`, deviceNotificationEvent),
  ])
  return updatedDeviceEntity
}

const addNotificationListener = Notifications.addListener
export { addNotificationListener }

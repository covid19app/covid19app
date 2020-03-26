import { AsyncStorage } from 'react-native';

import { post } from './Api';
import { getDeviceInfo } from './Device';
// import { getLocationAsync, locationDataToS2 } from './Geo';
import { generateEventId } from './Ids';
import { Event, EventInfo } from './schema';

async function generateEventInfo(): Promise<EventInfo> {
  const deviceInfo = getDeviceInfo()
  const eventInfo: EventInfo = {
    eventId: generateEventId(),
    deviceId: deviceInfo.deviceId,
    timestampInEpochS: Date.now() / 1000,
    // s2Cell: locationDataToS2(await getLocationAsync()),
  }
  return eventInfo
}

export async function publishEvent<T extends Event, R>(url: string, event: T): Promise<R> {
  const eventInfo = await generateEventInfo()
  const fullEvent = {eventInfo, ...event}
  const todoEventKey = `TODO-${eventInfo.eventId}`
  await AsyncStorage.multiSet([
    [eventInfo.eventId, JSON.stringify(fullEvent)],
    [todoEventKey, url],
  ])
  const response = await post(url, fullEvent)
  AsyncStorage.removeItem(todoEventKey)
  return response
}

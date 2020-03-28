import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
// import * as S2 from 's2-geometry';

import Config from '../constants/Config';

export async function getLocationAsync(
    accuracy: Location.Accuracy = Config.GEO_DEFAULT_ACCURACY): Promise<Location.LocationData> {
  const { status } = await Permissions.askAsync(Permissions.LOCATION)
  if (status !== 'granted') {
    alert('Permission to access location was denied')
  }
  return await Location.getCurrentPositionAsync({accuracy})
}

// export function latLngToS2(lat: number, lng: number, level: number = Config.GEO_DEFAULT_S2_LEVEL): string {
//   return S2.latLngToKey(lat, lng, level)
// }

// export function locationDataToS2(locationData: Location.LocationData,
//     level: number = Config.GEO_DEFAULT_S2_LEVEL): string {
//   return S2.latLngToKey(locationData.coords.latitude, locationData.coords.longitude, level)
// }

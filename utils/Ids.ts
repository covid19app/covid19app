import uuid from 'react-native-uuid';

function generateId(prefix: String): string {
  return `${prefix}:${uuid.v4()}`
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

export default class EventInfo {
  constructor(
    readonly eventId: string,
    readonly deviceId: string,
    readonly timestampInEpochS: number) {}
}

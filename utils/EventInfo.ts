export default class EventInfo {
  constructor(
    readonly eventId: string,
    readonly personId: string,
    readonly deviceId: string,
    readonly timestampInEpochS: number) {}
}

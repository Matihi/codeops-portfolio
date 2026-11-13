export interface Session {
  id: string;
  eventId: string;
  title: string;
  startsAt: Date;
  endsAt: Date;
  room: number;
}

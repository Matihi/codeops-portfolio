import { Session } from './sessions.interfaces.js';

export const SESSIONS_SEED: Session[] = [
  {
    id: 'ses-101',
    eventId: 'evt-101',
    title: 'Introduction to Cloud Fundamentals',
    startsAt: new Date('2026-11-05T09:00:00.000Z'),
    endsAt: new Date('2026-11-05T10:00:00.000Z'),
    room: 'Room 2',
  },
  {
    id: 'ses-102',
    eventId: 'evt-101',
    title: 'Cloud Service Models',
    startsAt: new Date('2026-11-05T10:15:00.000Z'),
    endsAt: new Date('2026-11-05T11:15:00.000Z'),
    room: 'Room 2',
  },
  {
    id: 'ses-103',
    eventId: 'evt-101',
    title: 'Hands-on Cloud Deployment',
    startsAt: new Date('2026-11-05T11:30:00.000Z'),
    endsAt: new Date('2026-11-05T12:30:00.000Z'),
    room: 'Computer Lab 1',
  },

  {
    id: 'ses-104',
    eventId: 'evt-102',
    title: 'HTML and CSS Fundamentals',
    startsAt: new Date('2026-11-09T08:30:00.000Z'),
    endsAt: new Date('2026-11-09T10:00:00.000Z'),
    room: 'Computer Lab 1',
  },
  {
    id: 'ses-105',
    eventId: 'evt-102',
    title: 'JavaScript and Interactive Web Pages',
    startsAt: new Date('2026-11-09T10:30:00.000Z'),
    endsAt: new Date('2026-11-09T12:00:00.000Z'),
    room: 'Computer Lab 1',
  },

  {
    id: 'ses-106',
    eventId: 'evt-103',
    title: 'Turning Ideas into Business',
    startsAt: new Date('2026-11-11T10:00:00.000Z'),
    endsAt: new Date('2026-11-11T12:00:00.000Z'),
    room: 'Hall 3',
  },

  {
    id: 'ses-107',
    eventId: 'evt-104',
    title: 'Opening Matches',
    startsAt: new Date('2026-11-16T13:00:00.000Z'),
    endsAt: new Date('2026-11-16T14:00:00.000Z'),
    room: 'Main Football Field',
  },
  {
    id: 'ses-108',
    eventId: 'evt-104',
    title: 'Semi-final Matches',
    startsAt: new Date('2026-11-16T14:15:00.000Z'),
    endsAt: new Date('2026-11-16T15:15:00.000Z'),
    room: 'Main Football Field',
  },
  {
    id: 'ses-109',
    eventId: 'evt-104',
    title: 'Final and Award Ceremony',
    startsAt: new Date('2026-11-16T15:30:00.000Z'),
    endsAt: new Date('2026-11-16T16:30:00.000Z'),
    room: 'Main Football Field',
  },

  {
    id: 'ses-110',
    eventId: 'evt-105',
    title: 'AI Applications in Everyday Life',
    startsAt: new Date('2026-11-20T09:30:00.000Z'),
    endsAt: new Date('2026-11-20T11:00:00.000Z'),
    room: 'Main Auditorium',
  },
  {
    id: 'ses-111',
    eventId: 'evt-105',
    title: 'The Future of Artificial Intelligence',
    startsAt: new Date('2026-11-20T11:15:00.000Z'),
    endsAt: new Date('2026-11-20T12:30:00.000Z'),
    room: 'Main Auditorium',
  },

  {
    id: 'ses-112',
    eventId: 'evt-106',
    title: 'Sustainable Living and Environmental Protection',
    startsAt: new Date('2026-11-27T08:00:00.000Z'),
    endsAt: new Date('2026-11-27T10:00:00.000Z'),
    room: 'Conference Room 1',
  },
];

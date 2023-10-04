export * from './nylastypes';
export interface DraftMessage {
  subject: string;
  id: string;
  date: number;
  content: string;
  plainText?: string;
  from: {
    name: string;
    email: string;
  };
}
export interface SentMessage extends DraftMessage {
  to: {
    name: string;
    email: string;
  };
}
export interface MessageBody {
  subject: string;
  body: string;
  plaintext: string;
  replyToMessageId?: string;
  type: 'reply' | 'direct';
  to: {
    name: string;
    email: string;
  };
  from: {
    email: string;
    name: string;
  };
}
export interface NylasInformation {
  email: string;
  userId: string;
  drafts: DraftMessage[];
  sentMessages: SentMessage[];
  openEmailPortal: boolean;
  openEventPortal: boolean;
  message: string;
  plainText: string;
  subject: string;
  recipient: string;
  eventTittle: string;
  startTime: string;
  endTime: string;
  participants: string;
  eventDescription: string;
  calendarId: string;
  activeLink: string;
  accessToken: string;
  setAccessToken: (token: string) => void;
  setActiveLink: (link: string) => void;
  setCalendarId: (id: string) => void;
  setEventDescription: (desc: string) => void;
  setEventParticipants: (users: string) => void;
  setEventEndTime: (time: string) => void;
  setEventTittle: (tittle: string) => void;
  setEventStartTime: (time: string) => void;
  setSubject: (subject: string) => void;
  setRecipient: (recipient: string) => void;
  setMessage: (message: string, plainText: string) => void;
  handEmailPortal: (state: boolean) => void;
  handEventPortal: (state: boolean) => void;
  createSentMessage: (data: SentMessage) => void;
  updateDraftContent: (id: string, data: string, plainText: string) => void;
  clearDraft: (id: string) => void;
  createDraft: (data: DraftMessage) => void;
  setEmail: (email: string) => void;
  setUserId: (userId: string) => void;
  logOut: () => void;
}

export interface MenuType {
  from: {
    name: string;
    email: string;
  };
  to: {
    name: string;
    email: string;
  };
  replyTo?: {
    name: string;
    email: string;
  };
  subject: string;
  date: number;
}

export interface EventBody {
  calendarId: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  participants: string;
}

export interface Calendar {
  id: string;
  object: string;
  account_id: string;
  name: string;
  description: string;
  read_only: boolean;
  location: string;
  timezone: string;
  is_primary: boolean;
}

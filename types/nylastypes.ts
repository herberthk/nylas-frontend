type Participant = { name: string; email: string };

type Label = {
  id: string;
  name: 'all' | 'social' | 'inbox';
  display_name: string;
};
export type File = {
  content_disposition: string;
  content_id: string;
  content_type: string;
  filename: string;
  id: string;
  size: number;
};

interface Message {
  id: string;
  object: string;
  account_id: string;
  subject: string;
  from: Participant[];
  reply_to: Participant[];
  to: Participant[];
  cc: [];
  bcc: [];
  date: number;
  thread_id: string;
  snippet: string;
  unread: boolean;
  starred: boolean;
  files: File[];
  events: [];
  labels: Label[];
}

export interface MessageDetails extends Message {
  body: string;
}

export interface Thread {
  id: string;
  object: string;
  account_id: string;
  subject: string;
  participants: Participant[];
  last_message_timestamp: number;
  last_message_received_timestamp: number;
  last_message_sent_timestamp: null;
  first_message_timestamp: 1696061082;
  snippet: string;
  unread: boolean;
  starred: boolean;
  has_attachments: boolean;
  version: string;
  folders: [];
  labels: Label[];
  message_ids: [];
  messages: Message[];
  drafts: [];
}

type EventParticipant = {
  name: string;
  email: string;
  comment: string;
  phone_number: string;
  status: string;
};

export interface EventResponse {
  id: string;
  object: string;
  account_id: string;
  calendar_id: string;
  ical_uid: string;
  message_id: string;
  title: string;
  description: string;
  owner: string;
  participants: EventParticipant[];
  read_only: boolean;
  location: string;
  when: {
    start_time: number;
    end_time: number;
    object: string;
  };
  busy: boolean;
  status: string;
  original_start_time: number | null;
  reminders: string | null;
  notifications: [];
  organizer_email: string;
  organizer_name: string;
  hide_participants: boolean;
  visibility: string;
  customer_event_id: string;
}

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { DraftMessage, NylasInformation, SentMessage } from '@/types';

export const useNylasStore = create<NylasInformation>()(
  devtools(
    persist(
      (set) => ({
        // initial state
        email: '',
        userId: '',
        drafts: [],
        sentMessages: [],
        openEmailPortal: false,
        openEventPortal: false,
        message: '',
        subject: '',
        recipient: '',
        plainText: '',
        endTime: '',
        eventTittle: '',
        participants: '',
        eventDescription: '',
        startTime: '',
        calendarId: '',
        activeLink: 'Inbox',
        accessToken: '',
        // methods for manipulating state
        setEmail: (email: string) => {
          set(() => ({
            email,
          }));
        },
        setUserId: (userId: string) => {
          set(() => ({
            userId,
          }));
        },
        clearDraft: (id: string) => {
          set((state) => ({
            drafts: state.drafts.filter((d) => d.id !== id),
          }));
        },
        createDraft: (draft: DraftMessage) => {
          set((state) => ({
            drafts: [{ ...draft }, ...state.drafts],
          }));
        },
        createSentMessage: (message: SentMessage) => {
          set((state) => ({
            sentMessages: [{ ...message }, ...state.sentMessages],
          }));
        },
        updateDraftContent: (id: string, data: string, plainText: string) => {
          set((state) => ({
            drafts: state.drafts.map((d) =>
              d.id === id
                ? {
                    content: data,
                    plainText,
                    date: d.date,
                    from: d.from,
                    id: d.id,
                    subject: d.subject,
                  }
                : { ...d }
            ),
          }));
        },
        handEmailPortal: (state: boolean) => {
          set(() => ({
            openEmailPortal: state,
            openEventPortal: false,
          }));
        },
        handEventPortal: (state: boolean) => {
          set(() => ({
            openEventPortal: state,
            openEmailPortal: false,
          }));
        },
        setMessage: (message: string, plainText: string) => {
          set(() => ({
            message,
            plainText,
          }));
        },
        setSubject: (subject: string) => {
          set(() => ({
            subject,
          }));
        },
        setRecipient: (recipient: string) => {
          set(() => ({
            recipient,
          }));
        },
        setEventDescription: (desc: string) => {
          set(() => ({
            eventDescription: desc,
          }));
        },
        setEventEndTime: (time: string) => {
          set(() => ({
            endTime: time,
          }));
        },
        setEventParticipants: (users: string) => {
          set(() => ({
            participants: users,
          }));
        },
        setEventStartTime: (time: string) => {
          set(() => ({
            startTime: time,
          }));
        },
        setEventTittle: (tittle: string) => {
          set(() => ({
            eventTittle: tittle,
          }));
        },
        setCalendarId: (calendarId: string) => {
          set(() => ({
            calendarId,
          }));
        },
        setActiveLink: (activeLink: string) => {
          set(() => ({
            activeLink: activeLink.trim(),
          }));
        },
        setAccessToken: (accessToken: string) => {
          set(() => ({
            accessToken,
          }));
        },
        logOut: () => {
          set(() => ({
            email: '',
            userId: '',
            drafts: [],
            sentMessages: [],
            openEmailPortal: false,
            openEventPortal: false,
            message: '',
            subject: '',
            recipient: '',
            plainText: '',
            endTime: '',
            eventTittle: '',
            participants: '',
            eventDescription: '',
            startTime: '',
            calendarId: '',
            activeLink: 'Inbox',
            accessToken: '',
          }));
        },
      }),
      {
        name: 'nylas-information',
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);

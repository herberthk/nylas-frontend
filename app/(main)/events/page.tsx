import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import Events from '@/components/events/Event';
import type { Calendar, EventResponse } from '@/types';

const getCalendarId = async (userId: string): Promise<string> => {
  const serverURL = process.env.SERVER_URL;
  const url = `${serverURL}/nylas/read-calendars`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: userId ?? '',
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const calendars: Calendar[] = await res.json();
    const [calendar] = calendars.filter((c) => c.is_primary);
    // if no primary calendar, use the first one
    return calendar.id ?? calendars[0].id;
  } catch (error) {
    //@ts-ignore
    return error.statusText;
  }
};

const getEvents = async (userId: string, calendarId: string): Promise<EventResponse[]> => {
  const startsAfter = Math.floor(new Date().getTime() / 1000); // today
  const date = new Date();
  date.setDate(date.getDate() + 7);
  const endsBefore = Math.floor(date.getTime() / 1000); // 7 days from today
  const serverURL = process.env.SERVER_URL;

  try {
    const limit = 20;
    const url = `${serverURL}/nylas/read-events?limit=${limit}&startsAfter=${startsAfter}&endsBefore=${endsBefore}&calendarId=${calendarId}`;
    const res = await fetch(url, {
      headers: {
        Authorization: userId ?? '',
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 20,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return (await res.json()).filter((event: EventResponse) => event.status !== 'cancelled');
  } catch (error) {
    //@ts-ignore
    return error.statusText;
  }
};

const Page = async (): Promise<React.JSX.Element> => {
  const cookieStore = cookies();
  const cookie = cookieStore.get('userId');
  const Authenticated = !!cookie?.value;

  if (!Authenticated) {
    redirect('/auth');
  }

  const calendarId = await getCalendarId(cookie?.value);
  const events = await getEvents(cookie?.value, calendarId);
  // if (calendarId) {
  //   // cookieStore.set();
  //   setCookie('calendarId', calendarId);
  // }

  return <Events calendarId={calendarId} events={events ?? []} />;
};

export default Page;

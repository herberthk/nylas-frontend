import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactElement } from 'react';
import React from 'react';

import MessageDetail from '@/components/messageDetail/MessageDetail';

const getEmailDetails = async (emailId: string, userId: string) => {
  const serverURL = process.env.SERVER_URL;
  const queryParams = new URLSearchParams({ id: emailId });
  const url = `${serverURL}/nylas/message?${queryParams.toString()}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: userId ?? '',
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 3600, // revalidate at most every hour,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const emails = await res.json();
    return emails;
  } catch (error) {
    //@ts-ignore
    return error.statusText;
  }
};

type Props = {
  params: {
    id: string;
  };
};

type FCAsync = ({ params }: Props) => Promise<ReactElement>;

const Page: FCAsync = async ({ params }) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get('userId');
  const Authenticated = !!cookie?.value;

  if (!Authenticated) {
    redirect('/auth');
  }
  const message = await getEmailDetails(params.id, cookie?.value);

  return <MessageDetail message={message} />;
};

export default Page;

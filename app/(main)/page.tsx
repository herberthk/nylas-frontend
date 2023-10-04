import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactElement } from 'react';
import React from 'react';

// import util from 'util';
import Home from '@/components/home/Home';

const getEmails = async (userId?: string) => {
  const serverURL = process.env.SERVER_URL;
  const url = `${serverURL}/nylas/read-emails`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: userId ?? '',
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 0,
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
  searchParams: { code: string };
};

type FCAsync = ({ searchParams }: Props) => Promise<ReactElement>;

const HomePage: FCAsync = async ({ searchParams }) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get('userId');
  const Authenticated = !!(cookie?.value || searchParams.code);
  let emails = [];
  if (!Authenticated) {
    redirect('/auth');
  }
  if (cookie?.value) {
    emails = await getEmails(cookie?.value);
  }

  return <Home emails={emails} />;
};

export default HomePage;

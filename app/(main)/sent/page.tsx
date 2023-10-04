import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import SentMessages from '@/components/sent/Sent';

const Page = (): React.JSX.Element => {
  const cookieStore = cookies();
  const cookie = cookieStore.get('userId');
  const Authenticated = !!cookie?.value;

  if (!Authenticated) {
    redirect('/auth');
  }
  return <SentMessages />;
};

export default Page;

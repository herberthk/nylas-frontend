import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import SentDetail from '@/components/sent/Sentdetail';

const Page = (): React.JSX.Element => {
  const cookieStore = cookies();
  const cookie = cookieStore.get('userId');
  const Authenticated = !!cookie?.value;

  if (!Authenticated) {
    redirect('/auth');
  }
  return <SentDetail />;
};

export default Page;

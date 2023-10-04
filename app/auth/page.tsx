import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import Auth from '@/components/auth/auth';

const Login = (): React.JSX.Element => {
  const cookieStore = cookies();
  const cookie = cookieStore.get('userId');

  if (cookie?.value) {
    redirect('/');
  }
  return <Auth />;
};

export default Login;

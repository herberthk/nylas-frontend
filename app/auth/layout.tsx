import type { FC } from 'react';
import React from 'react';

import Header from '@/components/Header/Header';

export const metadata = {
  title: 'Connect your email',
};

type Props = {
  children: React.ReactNode;
};
const RootLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default RootLayout;

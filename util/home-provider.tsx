'use client';

import type { FC } from 'react';
import React from 'react';

import { useNylasAuth } from '@/hooks/use-nylas-auth';

type Props = {
  children: React.ReactNode;
};
const HomeProvider: FC<Props> = ({ children }) => {
  useNylasAuth();
  return <>{children}</>;
};

export default HomeProvider;

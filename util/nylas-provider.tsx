'use client';

import { NylasProvider } from '@nylas/nylas-react';
import type { FC } from 'react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  serverURL: string;
};
const Provider: FC<Props> = ({ children, serverURL }) => {
  return <NylasProvider serverBaseUrl={serverURL}>{children}</NylasProvider>;
};

export default Provider;

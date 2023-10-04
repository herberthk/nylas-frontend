'use client';

import { Next13ProgressBar } from 'next13-progressbar';
import type { FC } from 'react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
// This provider is gets context of all pages and apply top loading bar
const Providers: FC<Props> = ({ children }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="4px"
        color="#0A2FFF"
        options={{ showSpinner: true }}
        showOnShallow
      />
    </>
  );
};

export default Providers;

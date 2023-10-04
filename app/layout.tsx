import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/global.scss';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Open_Sans } from 'next/font/google';
import type { FC } from 'react';
import React from 'react';

import { theme } from '@/theme';
import Provider from '@/util/nylas-provider';

import Providers from './providers';

const font = Open_Sans({ subsets: ['latin'] });

const description = `
Nylas provides the integration layer with your email service provider, so you can monitor your end users' email and calendars for changes and react to them as needed, create new events, and write and send messages on their behalf`;

export const metadata = {
  title: 'Nylas app',
  description,
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  const serverURL = process.env.SERVER_URL;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={font.className}>
        <MantineProvider theme={theme}>
          <Notifications />
          {/* Provides to progress bar */}
          <Providers>
            <Provider serverURL={serverURL}>{children}</Provider>
          </Providers>
        </MantineProvider>
      </body>
    </html>
  );
};
export default RootLayout;

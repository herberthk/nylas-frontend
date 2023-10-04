import type { Meta } from '@storybook/react';
import React from 'react';

import Auth from './auth';

export default {
  title: 'Auth page',
  component: Auth,
} as Meta<typeof Auth>;

export const Usage = (): React.ReactNode => <Auth />;

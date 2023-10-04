import type { Meta } from '@storybook/react';
import React from 'react';

import Component404 from './404';

export default {
  title: 'Not found page',
  component: Component404,
} as Meta<typeof Component404>;

export const Usage = (): React.ReactNode => <Component404 />;

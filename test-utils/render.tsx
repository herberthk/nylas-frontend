import { MantineProvider } from '@mantine/core';
import { render as testingLibraryRender } from '@testing-library/react';
import React from 'react';

import { theme } from '../theme/theme';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const render = (ui: React.ReactNode) => {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme}>{children}</MantineProvider>
    ),
  });
};

'use client';

import { ActionIcon, Box, Group, Image, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSunHigh } from '@tabler/icons-react';
import NextImage from 'next/image';
import type { FC } from 'react';
import React from 'react';

import NylasLogo from '@/public/icons/nylas-logo-horizontal.svg';

export const ThemeComponent = (): React.JSX.Element => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Box mr="sm">
      <Tooltip label={colorScheme === 'light' ? 'Dark mode' : 'Light mode'}>
        {colorScheme === 'dark' ? (
          <ActionIcon
            onClick={() => setColorScheme('light')}
            style={{ border: 0 }}
            variant="default"
            aria-label="Dark theme"
          >
            <IconSunHigh />
          </ActionIcon>
        ) : (
          <ActionIcon
            onClick={() => setColorScheme('dark')}
            style={{ border: 0 }}
            variant="default"
            aria-label="Light theme"
          >
            <IconMoon />
          </ActionIcon>
        )}
      </Tooltip>
    </Box>
  );
};

type Props = {
  isAuthenticated?: boolean;
};

const Header: FC<Props> = ({ isAuthenticated = false }) => {
  return (
    <Group justify="space-between" gap="xs" p="xs">
      <Image component={NextImage} src={NylasLogo} alt="Nylas logo" />
      {isAuthenticated && ''}
      <ThemeComponent />
    </Group>
  );
};

export default Header;

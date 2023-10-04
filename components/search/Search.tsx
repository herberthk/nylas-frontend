'use client';

import type { TextInputProps } from '@mantine/core';
import { ActionIcon, rem, TextInput, useMantineTheme } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import type { FC } from 'react';
import React from 'react';

type Props = {
  otherProps?: TextInputProps;
  page?: string;
};
const Search: FC<Props> = ({ otherProps, page = 'mail' }): React.JSX.Element => {
  const theme = useMantineTheme();

  return (
    <TextInput
      radius="xl"
      size="xs"
      placeholder={`Search ${page}`}
      rightSectionWidth={32}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon size="md" radius="xl" color={theme.primaryColor} variant="filled">
          <IconArrowRight />
        </ActionIcon>
      }
      {...otherProps}
    />
  );
};

export default Search;

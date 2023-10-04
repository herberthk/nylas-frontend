'use client';

import { Avatar, Box, Button, Group, Paper, Text } from '@mantine/core';
import { IconArrowBackUp, IconCornerUpRight } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import React from 'react';

import { useNylasStore } from '@/store';
import { formatDate } from '@/util/format-date';
import { cleanEmailBody } from '@/util/sanitize-html';

import MenuComponent from '../menu/Menu';

const SentDetail = (): React.JSX.Element => {
  const { id } = useParams();
  const sent = useNylasStore((state) => state.sentMessages);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const message = sent.find((m) => m.id === id)!;
  return (
    <Paper shadow="xs" withBorder p="sm">
      <Text fw={600} size="lg">
        {message?.subject || 'Unknown'}
      </Text>
      <Group mt="md" justify="space-between">
        <Group gap="xs">
          <Avatar color="blue" src={null} radius="xl">
            {message?.to.name[0].toLocaleUpperCase()}
          </Avatar>
          <Group style={{ gap: '2px' }}>
            <Text size="sm" fw="bold">
              {message?.to.name}
            </Text>
            <Text size="sm">{`<${message?.to.email}>`}</Text>
          </Group>
        </Group>
        <Text mr="lg" suppressHydrationWarning size="sm">
          {/* @ts-ignore */}
          {formatDate(new Date(message.date * 1000))}
        </Text>
      </Group>
      <Box style={{ marginTop: '-12px', marginLeft: '3rem' }}>
        <Group style={{ gap: 0 }}>
          <Text size="xs">to {message?.to.name}</Text>
          <MenuComponent
            date={message?.date}
            from={message?.from}
            subject={message?.subject}
            to={message?.to}
          />
        </Group>
      </Box>
      <Box
        dangerouslySetInnerHTML={{
          __html: cleanEmailBody(message?.content ?? ''),
        }}
      />

      <Group>
        <Button radius="lg" leftSection={<IconArrowBackUp size={14} />} variant="default">
          Reply
        </Button>
        <Button radius="lg" leftSection={<IconCornerUpRight size={14} />} variant="default">
          Forward
        </Button>
      </Group>
    </Paper>
  );
};

export default SentDetail;

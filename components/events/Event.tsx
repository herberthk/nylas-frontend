'use client';

import { Box, Button, Center, Flex, Group, Loader, Paper, Stack, Text } from '@mantine/core';
import { IconArrowBadgeDown, IconArrowBadgeUp, IconCircleArrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import { useNylasStore } from '@/store';
import type { EventResponse } from '@/types';
import { displayMeetingTime } from '@/util/date';

type Props = {
  calendarId: string;
  events: EventResponse[];
};

type Prop = {
  event: EventResponse;
};
const Event: FC<Prop> = ({ event }) => {
  const eventDate = new Date(event.when.start_time * 1000);
  const [expanded, setExpanded] = useState(false);
  return (
    <Paper my="lg" p="xs" shadow="sm">
      <Group justify="space-between">
        <Group>
          <Flex px="md" direction="column" style={{ borderRight: '1px solid #ccc' }}>
            <Text ta="center" size="xl" fw="bold">
              {eventDate.getDate()}
            </Text>
            <Text style={{ textTransform: 'uppercase' }} size="md" fw="bold">
              {eventDate.toLocaleString('en-US', { month: 'short' })}
            </Text>
          </Flex>
          <Flex px="xs" direction="column">
            <Text>{event.title} </Text>
            <Text suppressHydrationWarning>{displayMeetingTime(event.when)} </Text>
          </Flex>
        </Group>
        <Button
          onClick={() => setExpanded(!expanded)}
          rightSection={!expanded ? <IconArrowBadgeDown /> : <IconArrowBadgeUp />}
          variant="default"
        >
          {!expanded ? 'View details' : 'Collapse'}
        </Button>
      </Group>
      {expanded && (
        <Flex ml="sm" mt="md" gap="xs" direction="column">
          <Text fw="bold">{event.title} </Text>
          <Text>
            {eventDate.toLocaleString('en-US', { month: 'long' })} {eventDate.getDate()}{' '}
            {displayMeetingTime(event.when)}
            {'  '}
            {eventDate.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]}
          </Text>
          <Text>Organized by: {event.organizer_email}</Text>
          <Text>Status: {event.status}</Text>

          <Box py="xs" style={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
            <Text fw="bold">Participants: ({event.participants.length})</Text>
            {event.participants.map((p) => (
              <Flex gap="xs" direction="column" key={p.name}>
                <Text>Name: {p.name}</Text>
                <Text>Email: {p.email}</Text>
                <Text>Phone: {p.phone_number}</Text>
                <Text>Comment: {p.comment}</Text>
              </Flex>
            ))}
          </Box>
          <Flex direction="column">
            <Text fw="bold">Description:</Text>
            <Text>{event.description}</Text>
          </Flex>
        </Flex>
      )}
    </Paper>
  );
};

const Events: FC<Props> = ({ events, calendarId }) => {
  const router = useRouter();
  const updateCalendarId = useNylasStore((state) => state.setCalendarId);

  const openPortal = useNylasStore((state) => state.handEventPortal);

  const [loading, settLoading] = useState(true);
  useEffect(() => {
    // Since we don't have the loading state from next server
    const timer = setTimeout(() => settLoading(false), 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (calendarId) {
      updateCalendarId(calendarId);
    }
  }, [calendarId, updateCalendarId]);

  useEffect(() => {
    // Refresh events after every 20 seconds
    const timer = setInterval(() => router.refresh(), 20000);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      <Paper px="lg" py="xs" shadow="sm" mb="xs">
        <Flex justify="space-between">
          <Text size="xl" fw="bold">
            Upcoming events
          </Text>
          <Button
            variant="default"
            fw="bold"
            size="xs"
            radius="lg"
            onClick={() => openPortal(true)}
            style={{ textTransform: 'uppercase' }}
            rightSection={<IconCircleArrowRight />}
          >
            Create new
          </Button>
        </Flex>
      </Paper>
      {events.length > 0 && events.map((event) => <Event event={event} key={event.id} />)}
      {events.length === 0 && !loading && (
        <Center mt="xl" pt="xl">
          <Text fw="bold" size="xl" ta="center">
            No event available
          </Text>
        </Center>
      )}
      {events.length === 0 && loading && (
        <Center>
          <Stack mt="xl" pt="xl">
            <Loader ml="md" color="blue" size="xl" />
            <Text fw="bold" size="xl" ta="center">
              Please wait...
            </Text>
          </Stack>
        </Center>
      )}
    </>
  );
};

export default Events;

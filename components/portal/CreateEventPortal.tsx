'use client';

import '@mantine/dates/styles.css';

import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Portal,
  rem,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import {
  IconCalendarEvent,
  IconCheck,
  IconCircleArrowRight,
  IconLineDashed,
  IconX,
} from '@tabler/icons-react';
import axios from 'axios';
import React, { useState } from 'react';
import { z } from 'zod';

import { useNylasStore } from '@/store';
import type { EventBody } from '@/types';
import { getDateTimestamp } from '@/util/date';

import classes from './Portal.module.scss';

const CreateEventPortal = (): React.JSX.Element | null => {
  const open = useNylasStore((state) => state.openEventPortal);

  const openPortal = useNylasStore((state) => state.handEventPortal);

  const userId = useNylasStore((state) => state.userId);
  const title = useNylasStore((state) => state.eventTittle);
  const updateTittle = useNylasStore((state) => state.setEventTittle);
  const description = useNylasStore((state) => state.eventDescription);
  const updateDescription = useNylasStore((state) => state.setEventDescription);
  const participants = useNylasStore((state) => state.participants);
  const updateParticipants = useNylasStore((state) => state.setEventParticipants);
  const startTime = useNylasStore((state) => state.startTime);
  const updateStartTime = useNylasStore((state) => state.setEventStartTime);
  const updateEndTime = useNylasStore((state) => state.setEventEndTime);
  const endTime = useNylasStore((state) => state.endTime);
  const email = useNylasStore((state) => state.email);
  const [loading, setLoading] = useState(false);
  const calendarId = useNylasStore((state) => state.calendarId);
  axios.defaults.headers.common.Authorization = userId;

  // Create a Zod schema for email validation
  const emailSchema = z.string().email();
  const createEvent = async (): Promise<void> => {
    if (
      participants.length < 4 ||
      !description.length ||
      title.length < 3 ||
      !startTime ||
      !endTime
    ) {
      notifications.show({
        title: 'Missing fields',
        icon: <IconX />,
        color: 'red',
        message: 'Hey check all fields and try again 🤥',
      });
      return;
    }
    // Check if there is only one participant
    if (participants.split(',').length < 2) {
      notifications.show({
        title: 'Invalid participants',
        icon: <IconX />,
        color: 'red',
        message: 'An event should have at least two participants 🤥',
      });
      return;
    }
    // clean participants string
    participants
      .split(',')
      .filter((x) => x === '')
      .join(',');

    // check if all email addresses are valid separated by comma
    if (!participants.split(',').every((p) => emailSchema.safeParse(p).success)) {
      notifications.show({
        title: 'Invalid email',
        icon: <IconX />,
        color: 'red',
        message: 'One of the emails is invalid 🤥',
      });
      return;
    }

    // Event endTime should be greater than startTime
    if (getDateTimestamp(endTime) <= getDateTimestamp(startTime)) {
      notifications.show({
        title: 'Invalid event time',
        icon: <IconX />,
        color: 'red',
        message: 'Event end time should be greater than start time',
      });
      return;
    }

    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${serverURL}/nylas/create-event`;

    const eventBody: EventBody = {
      calendarId,
      description,
      endTime: getDateTimestamp(endTime),
      participants,
      startTime: getDateTimestamp(startTime),
      title,
    };
    const id = notifications.show({
      loading: true,
      title: 'Please wait',
      message: `We're sending your message`,
      autoClose: false,
      withCloseButton: false,
    });
    setLoading(true);

    try {
      await axios.post(url, { ...eventBody });

      notifications.update({
        id,
        color: 'teal',
        title: 'Success',
        message: 'Success your message was sent',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 2000,
      });
      updateTittle('');
      updateDescription('');
      updateParticipants('');
      updateStartTime('');
      updateEndTime('');
      openPortal(false);
    } catch (error) {
      notifications.hide(id);
      notifications.show({
        title: 'Error',
        message: 'Something went wrong, try again',
        icon: <IconX />,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };
  // const date = new Date();
  //   const datetime = `${date.toDateString()} ${date.toLocaleTimeString()}`;
  return open ? (
    <Portal className={classes.portal}>
      <Stack justify="space-between" h="100%">
        <Flex direction="column" p={12} gap="xs">
          <Flex justify="space-between">
            <Text fw="bold">Create event</Text>
            <Group>
              <ActionIcon style={{ border: 0 }} variant="default">
                <IconLineDashed />
              </ActionIcon>
              <ActionIcon
                onClick={() => openPortal(false)}
                size="sm"
                style={{ border: 0 }}
                variant="default"
              >
                <IconX />
              </ActionIcon>
            </Group>
          </Flex>
          <TextInput
            radius="xl"
            placeholder="Provide event title"
            required
            label="Event tittle"
            value={title}
            onChange={(e) => updateTittle(e.target.value)}
          />

          <DateTimePicker
            rightSection={<IconCalendarEvent />}
            required
            hideOutsideDates
            valueFormat="DD MM YYYY hh:mm A"
            label="Start time"
            placeholder="Pick date and time"
            clearable
            radius="xl"
            value={startTime ? new Date(startTime) : new Date()}
            defaultValue={new Date()}
            onChange={(e) => {
              updateStartTime(
                `${e?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })} ${e?.toLocaleTimeString()}`
              );
            }}
          />
          <DateTimePicker
            value={endTime ? new Date(endTime) : new Date()}
            rightSection={<IconCalendarEvent />}
            radius="xl"
            required
            hideOutsideDates
            valueFormat="DD MMM YYYY hh:mm A"
            label="End time"
            placeholder="Pick date and time"
            clearable
            defaultValue={new Date()}
            onChange={(e) => {
              updateEndTime(
                `${e?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })} ${e?.toLocaleTimeString()}`
              );
            }}
          />
          <TextInput
            radius="xl"
            placeholder="Participants email"
            required
            defaultValue={email}
            label="Participants"
            description="Separate by comma for multiple participants"
            value={!participants ? email : participants}
            onChange={(e) => updateParticipants(e.target.value)}
          />
          <Textarea
            radius="md"
            label="Description"
            withAsterisk
            error=""
            autosize
            value={description}
            minRows={2}
            placeholder="Event description"
            onChange={(e) => updateDescription(e.target.value)}
          />
        </Flex>
        <Stack>
          <Group justify="space-between" mx="sm" mb="md">
            <Button
              mr="md"
              fw="bold"
              size="xs"
              radius="lg"
              onClick={createEvent}
              style={{ textTransform: 'uppercase' }}
              rightSection={<IconCircleArrowRight />}
              loading={loading}
            >
              {loading ? 'Please wait' : 'Create'}
            </Button>
            <Button
              style={{ textTransform: 'uppercase' }}
              onClick={() => openPortal(false)}
              variant="default"
              size="xs"
              radius="lg"
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Portal>
  ) : null;
};

export default CreateEventPortal;

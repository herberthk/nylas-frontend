'use client';

import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Portal,
  rem,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconCircleArrowRight,
  IconLineDashed,
  IconTrashX,
  IconX,
} from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';

import { useNylasStore } from '@/store';
import type { MessageBody, MessageDetails } from '@/types';

import TextEditor from '../text-editor/TextEditor';
import classes from './Portal.module.scss';

const SendEmailPortal = (): React.JSX.Element | null => {
  const [editorState, setEditorState] = useState<string | undefined>('');
  const [editorPlainTex, setEditorPlainTextState] = useState<string | undefined>('');
  const open = useNylasStore((state) => state.openEmailPortal);
  const message = useNylasStore((state) => state.message);
  const plainText = useNylasStore((state) => state.plainText);
  const setMessage = useNylasStore((state) => state.setMessage);
  const openPortal = useNylasStore((state) => state.handEmailPortal);
  const subject = useNylasStore((state) => state.subject);
  const recipient = useNylasStore((state) => state.recipient);
  const updateSubject = useNylasStore((state) => state.setSubject);
  const updateRecipient = useNylasStore((state) => state.setRecipient);
  const saveCreatedMessage = useNylasStore((state) => state.createSentMessage);
  const userId = useNylasStore((state) => state.userId);
  const email = useNylasStore((state) => state.email);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!editorState || !editorPlainTex) {
      return;
    }
    setMessage(editorState, editorPlainTex);
  }, [editorPlainTex, editorState, setMessage]);
  axios.defaults.headers.common.Authorization = userId;

  // Create a Zod schema for email validation
  const emailSchema = z.string().email();
  const sendMessage = async (): Promise<void> => {
    // Parse an email address using the schema
    const result = emailSchema.safeParse(recipient);
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${serverURL}/nylas/send-email`;
    if (!recipient || !subject) {
      notifications.show({
        title: 'Missing fields',
        icon: <IconX />,
        color: 'red',
        message: 'Hey check all fields and try again 🤥',
      });
      return;
    }

    if (!message.length) {
      notifications.show({
        title: 'Missing message',
        icon: <IconX />,
        color: 'red',
        message: 'Hey check your message and try again 🤥',
      });
      return;
    }

    if (!result.success) {
      notifications.show({
        title: 'Invalid email',
        icon: <IconX />,
        color: 'red',
        message: 'Hey check your email and try again 🤥',
      });
      return;
    }

    const messageBody: MessageBody = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      body: message,
      plaintext: plainText,
      subject,
      to: {
        email: recipient,
        name: recipient,
      },
      from: {
        name: email,
        email,
      },
      type: 'direct',
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
      const { data } = await axios.post(url, { ...messageBody });
      const res = data as MessageDetails;
      saveCreatedMessage({
        date: res.date,
        content: res.body,
        id: res.id,
        subject: res.subject,
        to: {
          name: res.to[0].name,
          email: res.to[0].email,
        },
        from: {
          name: '',
          email,
        },
      });
      updateRecipient('');
      updateSubject('');
      setMessage('', '');
      setLoading(false);
      openPortal(false);

      notifications.update({
        id,
        color: 'teal',
        title: 'Success',
        message: 'Success your message was sent',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 2000,
      });
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
  return open ? (
    <Portal className={classes.portal}>
      <Stack justify="space-between" h="100%">
        <Flex direction="column" p={12} gap="xs">
          <Flex justify="space-between">
            <Text fw="bold">New message</Text>
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
            placeholder="To"
            required
            type="email"
            style={{
              border: 0,
            }}
            //   classNames={classes}
            value={recipient}
            onChange={(e) => updateRecipient(e.target.value)}
          />
          <TextInput
            placeholder="Subject"
            required
            style={{
              border: 0,
            }}
            //   classNames={classes}
            value={subject}
            onChange={(e) => updateSubject(e.target.value)}
          />
        </Flex>
        <Stack>
          <TextEditor
            setEditorPlainTextState={setEditorPlainTextState}
            content={message}
            setEditorState={setEditorState}
          />
          <Group justify="space-between" mx="sm" mb="md">
            <Button
              mr="md"
              fw="bold"
              size="xs"
              radius="lg"
              onClick={sendMessage}
              style={{ textTransform: 'uppercase' }}
              rightSection={<IconCircleArrowRight />}
              loading={loading}
            >
              {loading ? 'Please wait' : 'send'}
            </Button>
            <ActionIcon onClick={() => openPortal(false)} style={{ border: 0 }} variant="default">
              <IconTrashX style={{ color: 'dimgray' }} />
            </ActionIcon>
          </Group>
        </Stack>
      </Stack>
    </Portal>
  ) : null;
};

export default SendEmailPortal;

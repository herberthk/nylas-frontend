import { ActionIcon, Avatar, Button, Group, Paper, rem, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconArrowBackUp,
  IconCheck,
  IconCircleArrowRight,
  IconCornerUpRight,
  IconTrashX,
  IconX,
} from '@tabler/icons-react';
import axios from 'axios';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import { useNylasStore } from '@/store';
import type { MessageBody, MessageDetails } from '@/types';

import TextEditor from '../text-editor/TextEditor';

type Props = {
  message: MessageDetails;
};
const Reply: FC<Props> = ({ message }): React.JSX.Element => {
  const [editorState, setEditorState] = useState<string | undefined>('');
  const [editorPlainTex, setEditorPlainTextState] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);
  const drafts = useNylasStore((state) => state.drafts);

  const replyOn = drafts.map((d) => d.id).includes(message.id);
  const clearDraft = useNylasStore((state) => state.clearDraft);
  const createDraft = useNylasStore((state) => state.createDraft);
  const updateDraft = useNylasStore((state) => state.updateDraftContent);
  const draftContent = drafts.find((d) => d.id === message.id)?.content;
  const draftPlainText = drafts.find((d) => d.id === message.id)?.plainText;
  const userId = useNylasStore((state) => state.userId);
  const saveCreatedMessage = useNylasStore((state) => state.createSentMessage);
  useEffect(() => {
    if (!editorState) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    updateDraft(message.id, editorState, editorPlainTex!);
  }, [editorPlainTex, editorState, message.id, updateDraft]);
  axios.defaults.headers.common.Authorization = userId;
  const replyMessage = async (): Promise<void> => {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${serverURL}/nylas/send-email`;
    if (!editorState || !draftPlainText) {
      notifications.show({
        title: 'Invalid message',
        icon: <IconX />,
        color: 'red',
        message: 'Hey check your message and try again 🤥',
      });
    }

    const messageBody: MessageBody = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      body: draftContent!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      plaintext: draftPlainText!,
      subject: message.subject,
      replyToMessageId: message.id,
      to: {
        email: message.from[0].email,
        name: message.from[0].name,
      },
      from: {
        email: message.to[0].email,
        name: message.to[0].name,
      },
      type: 'reply',
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
          name: message.to[0].name,
          email: message.to[0].email,
        },
      });
      setLoading(false);
      clearDraft(message.id);
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

  return (
    <Paper mt="md" shadow="md" withBorder p="sm">
      {!replyOn && (
        <Group>
          <Button
            onClick={() =>
              createDraft({
                content: '',
                date: new Date().getTime(),
                id: message.id,
                subject: message.subject,
                from: {
                  name: message.from?.[0]?.name,
                  email: message.from?.[0]?.email,
                },
              })
            }
            radius="lg"
            leftSection={<IconArrowBackUp size={14} />}
            variant="default"
          >
            Reply
          </Button>
          <Button radius="lg" leftSection={<IconCornerUpRight size={14} />} variant="default">
            Forward
          </Button>
        </Group>
      )}
      {replyOn && (
        <Stack mb="md">
          <Group>
            <Avatar color="blue" src={null} radius="xl">
              {message.from[0].name[0].toLocaleUpperCase()}
            </Avatar>
            <IconArrowBackUp size={17} />
            <Group style={{ gap: '2px' }}>
              <Text size="sm" fw="bold">
                {message.from[0].name}
              </Text>
              <Text size="sm">{`<${message.from[0].email}>`}</Text>
            </Group>
          </Group>
          <TextEditor
            setEditorPlainTextState={setEditorPlainTextState}
            content={draftContent ?? ''}
            setEditorState={setEditorState}
          />
          <Group justify="space-between" mx="xl">
            <Button
              mr="xl"
              fw="bold"
              radius="lg"
              onClick={replyMessage}
              style={{ textTransform: 'uppercase' }}
              rightSection={<IconCircleArrowRight />}
              loading={loading}
            >
              {loading ? 'Please wait' : ' Reply email'}
            </Button>
            <ActionIcon
              onClick={() => clearDraft(message.id)}
              style={{ border: 0 }}
              variant="default"
            >
              <IconTrashX style={{ color: 'dimgray' }} />
            </ActionIcon>
          </Group>
        </Stack>
      )}
    </Paper>
  );
};

export default Reply;

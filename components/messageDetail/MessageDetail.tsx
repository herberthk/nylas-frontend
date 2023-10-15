'use client';

import { Avatar, Box, Flex, Group, Paper, Text } from '@mantine/core';
import axios from 'axios';
import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';

import { useNylasStore } from '@/store';
import type { File, MessageDetails } from '@/types';
import { formatDate } from '@/util/format-date';
import { cleanEmailBody } from '@/util/sanitize-html';

import MenuComponent from '../menu/Menu';
import Reply from '../reply/Reply';

type Props = {
  message: MessageDetails;
};
const MessageDetail: FC<Props> = ({ message }): React.JSX.Element => {
  const userId = useNylasStore((state) => state.userId);
  const downloadAttachedFile = (fileBuffer: string, file: File) => {
    const blob = new Blob([fileBuffer], { type: file.content_type });
    const blobFile = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobFile;
    a.download = file.filename ?? file.id;
    a.target = '_blank';
    a.click();
    a.remove();
  };

  axios.defaults.headers.common.Authorization = userId;
  const downloadAttachment = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    file: File
    // eslint-disable-next-line consistent-return
  ): Promise<void> => {
    event.stopPropagation();
    const queryParams = new URLSearchParams({ id: file.id });
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${serverUrl}/nylas/file?${queryParams.toString()}`;
    try {
      const res = await axios.get(url);

      const fileBuffer = await res.data;

      if (fileBuffer) return downloadAttachedFile(fileBuffer, file);
    } catch (e) {
      console.warn(`Error retrieving file:`, e);
      // return false;
    }
  };

  return (
    <>
      <Paper shadow="md" withBorder p="sm">
        <Text fw={600} size="lg">
          {message.subject || 'Unknown'}
        </Text>
        <Group mt="md" justify="space-between">
          <Group gap="xs">
            <Avatar color="blue" src={null} radius="xl">
              {message.from[0].name[0].toLocaleUpperCase()}
            </Avatar>
            <Group style={{ gap: '2px' }}>
              <Text size="sm" fw="bold">
                {message.from[0].name}
              </Text>
              <Text size="sm">{`<${message.from[0].email}>`}</Text>
            </Group>
          </Group>
          <Text mr="lg" suppressHydrationWarning size="sm">
            {formatDate(new Date(Math.floor(message.date * 1000)))}
          </Text>
        </Group>
        <Box style={{ marginTop: '-12px', marginLeft: '3rem' }}>
          <Group style={{ gap: 0 }}>
            <Text size="xs">to me</Text>
            <MenuComponent
              date={message.date}
              subject={message.subject}
              from={{
                name: message.from[0].name,
                email: message.from[0].email,
              }}
              to={{
                name: message.to[0].name,
                email: message.to[0].email,
              }}
            />
          </Group>
        </Box>
        <Box
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: cleanEmailBody(message.body),
          }}
        />
        {message.files.length > 0 && (
          <Group ml="xs" mt="lg">
            {message.files.map((file) => {
              return (
                <Flex
                  onClick={(e) => downloadAttachment(e, file)}
                  style={{ cursor: 'pointer' }}
                  direction="column"
                  key={file.id}
                >
                  <Image width={100} height={100} src="/icons/file.png" alt="File attachment" />
                  <Text style={{ marginTop: '2px' }} ta="center" size="xs">
                    {file.filename}
                  </Text>
                </Flex>
              );
            })}
          </Group>
        )}
      </Paper>
      <Reply message={message} />
    </>
  );
};

export default MessageDetail;

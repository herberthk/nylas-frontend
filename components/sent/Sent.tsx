'use client';

import { Box, Center, Checkbox, Flex, Group, Table, Text } from '@mantine/core';
import classNames from 'classnames';
import Link from 'next/link';
import type { FC } from 'react';
import React, { useState } from 'react';

import { useNylasStore } from '@/store';
import type { SentMessage } from '@/types';
import { formatDate } from '@/util/format-date';

import classes from '../home/home.module.css';

type Props = {
  message: Omit<SentMessage, 'from'>;
};

const Sent: FC<Props> = ({ message }) => {
  const [selection, setSelection] = useState(['1']);

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const selected = selection.includes(message.id);

  return (
    <Table.Tr
      style={{ cursor: 'pointer' }}
      className={classNames(classes.tableRow, { [classes.rowSelected]: selected })}
    >
      <Table.Td>
        <Group>
          <Checkbox
            checked={selection.includes(message.id)}
            onChange={() => toggleRow(message.id)}
          />
          <Link
            style={{
              width: '95%',
            }}
            href={`/sent/${message.id}`}
          >
            <Flex gap="sm" justify="space-between">
              <Group gap="md">
                <Text size="sm">{message.to.name || 'Unknown'}</Text>
                <Box>
                  <Text size="sm">
                    {message.subject.length > 80
                      ? `${message.subject.substring(0, 80)}...`
                      : message.subject || '(no subject)'}
                  </Text>
                </Box>
              </Group>

              <Box>
                <Text suppressHydrationWarning size="sm">
                  {formatDate(new Date(message.date * 1000))}
                </Text>
              </Box>
            </Flex>
          </Link>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

const SentMessages = (): React.JSX.Element => {
  const sent = useNylasStore((state) => state.sentMessages);
  return (
    <>
      {sent.length > 0 && (
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Tbody>
            {sent.map((d) => (
              <Sent key={d.id} message={d} />
            ))}
          </Table.Tbody>
        </Table>
      )}
      {sent.length === 0 && (
        <Center>
          <Text size="xl" ta="center">
            No message available
          </Text>
        </Center>
      )}
    </>
  );
};

export default SentMessages;

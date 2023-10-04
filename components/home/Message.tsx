import { Box, Checkbox, Flex, Group, Table, Text } from '@mantine/core';
import classNames from 'classnames';
import Link from 'next/link';
import type { FC } from 'react';
import React, { useState } from 'react';

import type { Thread } from '@/types';
import { formatDate } from '@/util/format-date';

import classes from './home.module.css';

type Props = {
  email: Thread;
};
const Message: FC<Props> = ({ email }): React.JSX.Element => {
  const [selection, setSelection] = useState(['1']);

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const selected = selection.includes(email.id);
  const { unread } = email.messages[0];

  return (
    <Table.Tr
      style={{ cursor: 'pointer' }}
      className={classNames(classes.tableRow, { [classes.rowSelected]: selected })}
    >
      <Table.Td>
        <Group>
          <Checkbox checked={selection.includes(email.id)} onChange={() => toggleRow(email.id)} />
          <Link
            style={{
              width: '95%',
            }}
            href={`/message/${email.messages[0].id}`}
          >
            <Flex gap="sm" justify="space-between">
              <Group gap="md">
                <Text fw={unread ? 'bold' : 'inherit'} size="sm">
                  {email.messages[0].from?.[0]?.name || 'Unknown'}
                </Text>
                <Box>
                  <Text size="sm" fw={unread ? 'bold' : 'inherit'}>
                    {email.subject.length > 60
                      ? `${email.subject.substring(0, 60)}...`
                      : email.subject || '(no subject)'}
                  </Text>
                </Box>
              </Group>

              <Box>
                <Text suppressHydrationWarning size="sm">
                  {formatDate(new Date(Math.floor(email.last_message_timestamp * 1000)))}
                </Text>
              </Box>
            </Flex>
          </Link>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export default Message;

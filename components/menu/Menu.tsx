import { ActionIcon, Group, Menu, Text } from '@mantine/core';
import { IconCaretDown } from '@tabler/icons-react';
import type { FC } from 'react';
import React from 'react';

import type { MenuType } from '@/types';
import { formatDate } from '@/util/format-date';

const MenuComponent: FC<MenuType> = ({ from, subject, to, replyTo, date }): React.JSX.Element => {
  return (
    <Menu shadow="md" position="bottom-start" offset={0} width="auto">
      <Menu.Target>
        <ActionIcon variant="default" style={{ border: 0 }}>
          <IconCaretDown style={{ width: '18px', height: '18px' }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <Group>
            <Text c="dimmed" size="sm">
              From:
            </Text>
            <Group style={{ gap: '2px' }}>
              <Text size="sm" fw="bold">
                {from.name}
              </Text>
              <Text size="sm">{`<${from.email}>`}</Text>
            </Group>
          </Group>
        </Menu.Item>
        {replyTo && (
          <Menu.Item>
            <Group>
              <Text c="dimmed" size="sm">
                Reply to:
              </Text>
              <Group style={{ gap: '2px' }}>
                <Text size="sm" fw="bold">
                  {replyTo?.name}
                </Text>
                <Text size="sm">{`<${replyTo?.email}>`}</Text>
              </Group>
            </Group>
          </Menu.Item>
        )}
        <Menu.Item>
          <Group>
            <Text c="dimmed" size="sm">
              To:
            </Text>
            <Text size="sm">{to.email}</Text>
          </Group>
        </Menu.Item>
        <Menu.Item>
          <Group>
            <Text c="dimmed" size="sm">
              Date:
            </Text>
            <Text suppressHydrationWarning size="sm">
              {formatDate(new Date(Math.floor(date * 1000)))}
            </Text>
          </Group>
        </Menu.Item>
        <Menu.Item>
          <Group>
            <Text ta="right" c="dimmed" size="sm">
              Subject:
            </Text>
            <Text size="sm">
              {subject.length > 50 ? `${subject.substring(0, 50)}...` : subject}
            </Text>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuComponent;

'use client';

import { ActionIcon, Flex, Loader, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconReload } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Refresh = (): React.JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    router.refresh();
    setLoading(true);
    const id = notifications.show({
      loading: true,
      title: 'Please wait',
      message: `We're processing your data`,
      autoClose: false,
      withCloseButton: false,
    });
    setTimeout(() => {
      setLoading(false);
      notifications.hide(id);
    }, 2000);
  };
  return (
    <Flex>
      {loading ? (
        <Loader color="blue" size="sm" type="bars" />
      ) : (
        <Tooltip label="Refresh">
          <ActionIcon style={{ border: 0 }} onClick={handleClick} size="sm" variant="default">
            <IconReload />
          </ActionIcon>
        </Tooltip>
      )}
    </Flex>
  );
};

export default Refresh;

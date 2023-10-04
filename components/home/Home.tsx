'use client';

import { Center, Loader, Stack, Table, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import type { Thread } from '@/types';

import Message from './Message';

type Props = {
  emails: Thread[];
};

const Home: FC<Props> = ({ emails }): React.JSX.Element => {
  const router = useRouter();
  const [loading, settLoading] = useState(true);
  useEffect(() => {
    // Since we don't have the loading state from next server
    const timer = setTimeout(() => settLoading(false), 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Refresh emails after every 20 seconds
    const timer = setInterval(() => router.refresh(), 20000);
    return () => clearInterval(timer);
  }, [router]);
  // remove draft emails since the lack common properties which causes errors
  const cleanEmails = emails.filter((email) => !email.drafts.length);
  return (
    <>
      {cleanEmails.length > 0 && (
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Tbody>
            {emails.map((email) => (
              <Message key={email.id} email={email} />
            ))}
          </Table.Tbody>
        </Table>
      )}
      {cleanEmails.length === 0 && !loading && (
        <Center mt="xl" pt="xl">
          <Text fw="bold" size="xl" ta="center">
            No email available
          </Text>
        </Center>
      )}
      {cleanEmails.length === 0 && loading && (
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

export default Home;

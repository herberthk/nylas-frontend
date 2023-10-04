'use client';

import { Button, Container, Paper, rem, Stack, TextInput, Title, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNylas } from '@nylas/nylas-react';
import { IconCheck, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { z } from 'zod';

import { useNylasStore } from '@/store';

import classes from './auth.module.scss';

const Auth = (): React.JSX.Element => {
  const saveEmail = useNylasStore((state) => state.setEmail);
  const email = useNylasStore((state) => state.email);
  const nylas = useNylas();

  const [isLoading, setIsLoading] = useState(false);
  // Create a Zod schema for email validation
  const emailSchema = z.string().email();
  const loginUser = async () => {
    // Parse an email address using the schema
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      notifications.show({
        title: 'Invalid email',
        icon: <IconX />,
        color: 'red',
        message: 'Hey check your email and try again 🤥',
      });
      return;
    }
    const id = notifications.show({
      loading: true,
      title: 'Please wait',
      message: `We're processing your data`,
      autoClose: false,
      withCloseButton: false,
    });

    try {
      setIsLoading(true);
      await nylas.authWithRedirect({
        emailAddress: email,
        successRedirectUrl: '',
      });

      notifications.update({
        id,
        color: 'teal',
        title: 'Success',
        message: 'Success your email is now connected',
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
      setIsLoading(false);
    }
  };
  return (
    <Stack h="80vh" justify="center" align="center" gap="xs">
      <Container size={460} my={30}>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <Title className={classes.title} ta="center">
            Connect your email to Nylas
          </Title>
          <TextInput
            onChange={(e) => saveEmail(e.target.value)}
            mt="lg"
            label="Your email"
            placeholder="me@emailprovider.com"
            required
            value={email}
            type="email"
          />
          <Tooltip label={isLoading ? 'Please wait' : 'Click to connect'}>
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'red', deg: 90 }}
              onClick={loginUser}
              loading={isLoading}
              fullWidth
              mt="xl"
              size="md"
            >
              {isLoading ? 'Please wait...' : 'Connect'}
            </Button>
          </Tooltip>
        </Paper>
      </Container>
    </Stack>
  );
};

export default Auth;

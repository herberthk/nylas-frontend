import { Button, Container, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import image from '../../public/icons/404.svg';
import classes from './404.module.scss';

const Component404 = (): React.JSX.Element => {
  return (
    <Container>
      <Stack style={{ height: '100vh' }} align="center" justify="center">
        <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
          <Image src={image.src} className={classes.mobileImage} alt="Not found" />
          <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text c="dimmed" size="lg">
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <Button
              href="/"
              component={Link}
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
            >
              Go back
            </Button>
          </div>
          <Image src={image.src} alt="Not found" className={classes.desktopImage} />
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default Component404;

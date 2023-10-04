import { Box, Flex, ScrollArea, Stack } from '@mantine/core';
import type { FC } from 'react';
import React from 'react';

import CreateEventPortal from '@/components/portal/CreateEventPortal';
import SendEmailPortal from '@/components/portal/SendEmailPortal';
import Refresh from '@/components/refresh/Refresh';
import Search from '@/components/search/Search';
import SideBarCompont from '@/components/sidebar/SideBar';
import HomeProvider from '@/util/home-provider';
// export const metadata = {
//   title: 'Connect your email',
// };

type Props = {
  children: React.ReactNode;
};
const RootLayout: FC<Props> = ({ children }) => {
  return (
    <HomeProvider>
      <SendEmailPortal />
      <CreateEventPortal />
      <Flex gap="xs">
        <SideBarCompont />
        <Stack mt="lg" className="container">
          <Flex style={{ gap: '6px', marginRight: '5px' }}>
            <Box style={{ flex: 1 }}>
              <Search />
            </Box>
            <Box
              style={{
                marginTop: '7px',
              }}
            >
              <Refresh />
            </Box>
          </Flex>
          <ScrollArea w="100%" h="90vh">
            {children}
          </ScrollArea>
        </Stack>
      </Flex>
    </HomeProvider>
  );
};
export default RootLayout;

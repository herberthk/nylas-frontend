'use client';

import { ActionIcon, Button, Drawer, Group, Image } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconCalendarEvent,
  IconCalendarPlus,
  IconFilePlus,
  IconInbox,
  IconMenu2,
  IconNotes,
  IconPencil,
  IconPower,
  IconSend,
  IconSettings,
} from '@tabler/icons-react';
import classNames from 'classnames';
import { deleteCookie } from 'cookies-next';
import NextImage from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import NylasLogo from '@/public/icons/nylas-logo-horizontal.svg';
import { useNylasStore } from '@/store';

import { ThemeComponent } from '../Header/Header';
import classes from './SideBar.module.scss';

const SideBar = (): React.JSX.Element => {
  const logoOut = useNylasStore((state) => state.logOut);
  const openEmailPortal = useNylasStore((state) => state.handEmailPortal);
  const openEventPortal = useNylasStore((state) => state.handEventPortal);

  const [active, setActive] = useState('Inbox');
  const router = useRouter();
  const logout = () => {
    logoOut();
    deleteCookie('userId');
    router.push('/auth');
  };

  const drafts = useNylasStore((state) => state.drafts);
  const sent = useNylasStore((state) => state.sentMessages);
  type LinkType = {
    link: string;
    label: string;
    icon: typeof IconCalendarEvent;
  };

  const data: LinkType[] = [
    { link: '/', label: 'Inbox', icon: IconInbox },
    {
      link: '/sent',
      label: `Sent ${sent.length > 0 ? `(${sent.length})` : ''}`,
      icon: IconSend,
    },
    {
      link: '/drafts',
      label: `Drafts ${drafts.length > 0 ? `(${drafts.length})` : ''}`,
      icon: IconNotes,
    },
    { link: '/events', label: 'Events', icon: IconCalendarEvent },
    { link: '/schedule', label: 'Schedule events', icon: IconCalendarPlus },

    { link: '/settings', label: 'Settings', icon: IconSettings },
  ];
  const links = data.map((item) => (
    <Link
      className={classNames(classes.link, {
        [classes.active]: item.label.split(' ')[0] === active,
      })}
      // data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => setActive(item.label.split(' ')[0])}
      suppressHydrationWarning
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Link href="/">
            <Image component={NextImage} src={NylasLogo} alt="Nylas logo" />
          </Link>
          <ThemeComponent />
        </Group>
        <Button
          className={classes.link}
          leftSection={<IconPencil />}
          style={{ border: 0 }}
          variant="default"
          fullWidth
          onClick={() => openEmailPortal(true)}
        >
          New email
        </Button>
        {links}
        <Button
          className={classes.link}
          leftSection={<IconFilePlus />}
          style={{ border: 0 }}
          variant="default"
          fullWidth
          onClick={() => openEventPortal(true)}
        >
          Create event
        </Button>
      </div>

      <div className={classes.footer}>
        <Button
          onClick={logout}
          style={{ border: 0 }}
          fullWidth
          variant="default"
          className={classes.link}
        >
          <IconPower className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
};

const SideBarCompont = (): React.JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);
  const mobile = useMediaQuery('(max-width: 36em)');
  return (
    <>
      {mobile ? (
        <>
          <ActionIcon mt="md" ml="xs" onClick={open} aria-label="Menu">
            <IconMenu2 />
          </ActionIcon>
          <Drawer opened={opened} onClose={close} withCloseButton={false} size="xs">
            <Drawer.Content style={{ overflow: 'hidden', overflowX: 'hidden' }}>
              <SideBar />
            </Drawer.Content>
          </Drawer>
        </>
      ) : (
        <SideBar />
      )}
    </>
  );
};

export default SideBarCompont;

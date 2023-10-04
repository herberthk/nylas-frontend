'use client';

import React, { useEffect } from 'react';

import { useNylasStore } from '@/store';

import nylas from './schedule-editor';

const Schedule = (): React.JSX.Element => {
  const token = useNylasStore((state) => state.accessToken);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!document.querySelector('iframe')) {
        nylas?.scheduler.show({
          auth: {
            accessToken: token,
          },
          style: {
            tintColor: '#32325d',
            backgroundColor: 'white',
          },
          defaults: {
            event: {
              title: '30-min Coffee Meeting',
              duration: 30,
            },
          },
        });
      }
    }
  }, [token]);
  return <div className="scheduler-app" />;
};

export default Schedule;

import { useNylas } from '@nylas/nylas-react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useNylasStore } from '@/store';

export const useNylasAuth = (): void => {
  const router = useRouter();
  const saveUserId = useNylasStore((state) => state.setUserId);
  const userId = useNylasStore((state) => state.userId);
  const saveAccessToken = useNylasStore((state) => state.setAccessToken);
  const nylas = useNylas();
  useEffect(() => {
    if (!nylas) {
      return;
    }

    // Handle the code that is passed in the query params from Nylas after a successful login
    const params = new URLSearchParams(window.location.search);
    (async () => {
      if (params.has('code') && !userId) {
        try {
          const user = await nylas.exchangeCodeFromUrlForToken();

          const { id, accessToken } = JSON.parse(user);
          saveUserId(id);
          saveAccessToken(accessToken);
          setCookie('userId', id);

          window.history.replaceState({}, '', '/');
          router.refresh();
        } catch (error) {
          console.error('An error occurred parsing the response:', error);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nylas]);
};

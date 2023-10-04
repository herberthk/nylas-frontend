declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL: string;
      NEXT_PUBLIC_SERVER_URL: string;
      NEXT_PUBLIC_SCHEDULER_URL: string;
    }
  }
}

export {};

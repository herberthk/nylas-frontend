import DOMPurify from 'dompurify';

export const cleanEmailBody = (body: string): string => {
  if (!body) return '';
  // if (typeof window === 'undefined') return '';
  return DOMPurify.sanitize(body, {
    USE_PROFILES: { html: true },
  });
};

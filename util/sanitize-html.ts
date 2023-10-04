import DOMPurify from 'dompurify';

export const cleanEmailBody = (body: string): string => {
  if (!body) return '';

  const cleanedBody = DOMPurify.sanitize(body, { USE_PROFILES: { html: true } });
  return cleanedBody;
};

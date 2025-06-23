import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'pt'] as const;
export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({locale}) => {
  // Fallback to default locale if locale is undefined
  const validLocale = locale && locales.includes(locale as any) ? locale : defaultLocale;
  
  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
}); 
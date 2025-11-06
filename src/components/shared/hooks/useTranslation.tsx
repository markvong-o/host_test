import { useState, useEffect } from 'react';

// Define the shape of the function that imports a translation file
type TranslationLoader = () => Promise<{ default: Record<string, any> }>;

// Map of available locales to their corresponding JSON files.
const translations: Record<string, TranslationLoader> = {
  // NOTE: Assuming you have separate files, pointing 'es' to its correct file.
  'en': () => import('@/components/shared/i18n/en.json'),
  'es': () => import('@/components/shared/i18n/es.json'), 
  // Add other languages here
};

export interface TranslationResult {
  // Changed return type from 'string' to 'any' to handle arrays and objects.
  t: (key: string) => string | any;
  loading: boolean;
}

/**
 * Custom Hook to load translation data based on the current locale.
 */
export function useTranslation(locale?: string): TranslationResult {
  // Change messages type to handle any JSON content
  const [messages, setMessages] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let currentLocale = locale;

    // 1. Fallback: If locale is undefined, try to read from window context
    if (!currentLocale && typeof window !== 'undefined') {
      currentLocale = navigator.language.split('-')[0] || 'en';
    }

    // 2. Find the correct import function, falling back to 'en'
    const importFn = translations[currentLocale!] || translations['en'];

    setLoading(true);
    
    // 3. Dynamically import the JSON file
    importFn()
      .then(module => {
        // Module is the JSON object imported from the file
        setMessages(module.default); 
      })
      .catch(error => {
        console.error(`Failed to load translation for locale: ${currentLocale}`, error);
        setMessages({});
      })
      .finally(() => {
        setLoading(false);
      });

  }, [locale]); 

  // The translation function now returns string | any, allowing arrays/objects to pass through
  const t = (key: string): string | any => messages[key] || key;

  return { t, loading };
}

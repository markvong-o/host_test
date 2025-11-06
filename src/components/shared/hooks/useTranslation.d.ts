declare module "@/components/shared/hooks/useTranslation" {
  export function useTranslation(locale: string): {
    t: (key: string) => string;
    loading: boolean;
  };
}
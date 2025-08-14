// src/i18n/index.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import LANG_EN from "./locale/en.json";
import LANG_FR from "./locale/fr.json";
import LANG_IT from "./locale/it.json";

const SUPPORTED_LANGUAGES = ["en", "fr", "it"] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const DEFAULT_LANGUAGE: SupportedLanguage = "en";
const STORAGE_KEY = "@app_language_preference";

const resources = {
  en: { translation: LANG_EN },
  fr: { translation: LANG_FR },
  it: { translation: LANG_IT },
} as const;

let isInitialized = false;

/** Rileva la lingua del device (fallback su DEFAULT_LANGUAGE). */
const getDeviceLanguage = (): SupportedLanguage => {
  const tag = getLocales()?.[0]?.languageCode ?? DEFAULT_LANGUAGE;
  return (
    SUPPORTED_LANGUAGES.includes(tag as SupportedLanguage)
      ? tag
      : DEFAULT_LANGUAGE
  ) as SupportedLanguage;
};

/** Ritorna la lingua salvata se valida. */
const getSavedLanguage = async (): Promise<SupportedLanguage | null> => {
  const saved = await AsyncStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(saved as SupportedLanguage)
    ? (saved as SupportedLanguage)
    : null;
};

/** Inizializza i18n una sola volta. */
export const initI18n = async (): Promise<SupportedLanguage> => {
  if (isInitialized) return i18n.language as SupportedLanguage;

  const deviceLang = getDeviceLanguage();
  const savedLang = await getSavedLanguage();
  const lng: SupportedLanguage = savedLang ?? deviceLang;

  const options: InitOptions = {
    resources,
    lng,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: false, // no dev mode
    compatibilityJSON: "v4",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    returnEmptyString: false,
    returnNull: false,
  };

  await i18n.use(initReactI18next).init(options);
  isInitialized = true;
  return lng;
};

/** Cambia lingua e persiste la scelta. */
export const changeLanguage = async (language: SupportedLanguage) => {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    throw new Error(`Unsupported language: ${language}`);
  }
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(STORAGE_KEY, language);
};

export const getCurrentLanguage = (): SupportedLanguage =>
  (i18n.language || DEFAULT_LANGUAGE) as SupportedLanguage;

export const getSupportedLanguages = (): readonly SupportedLanguage[] =>
  SUPPORTED_LANGUAGES;

export const resetLanguagePreference = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
  await changeLanguage(getDeviceLanguage());
};

/** Piccolo helper da usare nei componenti. */
export const useI18n = () => ({
  initI18n,
  changeLanguage,
  resetLanguagePreference,
  getCurrentLanguage,
  getSupportedLanguages,
  isInitialized: () => isInitialized,
});

export default i18n;

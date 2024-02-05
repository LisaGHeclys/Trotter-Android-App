import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import En from "./en.json";
import Fr from "./fr.json";

export const resources = {
    en: {
        translation: En
    },
    fr: {
        translation: Fr
    }
};

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: "en", // if you're using a language detector, do not define the lng option
    debug: true,
    fallbackLng: "en",
    resources
});
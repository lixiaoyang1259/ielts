import {getRequestConfig} from "next-intl/server";
import {getLocales} from "@/app/server-actions/modify-locale";

export namespace LocaleValues {
    export const localesDisplayName = {
        "ko": "Korean",
        "ja": "Japanese",
        "zh": "Chinese",
        "en": "English",
        "vn": "Vietnamese",
        // "te": "test",
        ...(process.env.NEXT_PUBLIC_USE_TEST_LANGUAGE==="true" &&{"te":"test"})
    }
    export const locales = Object.keys(localesDisplayName);
    export type Locale = typeof LocaleValues.locales[number];
    export const defaultLocale: Locale = 'en'
    export const COOKIE_LANGUAGE_NAME = 'locale_code'
}


export default getRequestConfig(async () => {
    // const locale:Locale = defaultLocales
    const locale = (await getLocales()) || LocaleValues.defaultLocale

    return {
        locale: locale,
        messages: (await import((`../i18n/${locale}.json`))).default
    }
})

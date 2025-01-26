'use server'

import {LocaleValues} from "@/i18n";
import {cookies, headers} from "next/headers";

export async function changeLocale(locale: LocaleValues.Locale) {
    cookies().set(LocaleValues.COOKIE_LANGUAGE_NAME, locale, {
        secure:  process.env.USE_HTTP === "1",
        maxAge: 60 * 60 * 24 * 365, //
    })
}

export async function getLocales() {
    let local =  cookies().get(LocaleValues.COOKIE_LANGUAGE_NAME)?.value
    if(!local){
      local = setDefaultLanguage(headers().get('accept-language'))
    }

    return local
}

function setDefaultLanguage(langs:string | null){
    if(!langs) return undefined
    const defaultLang = langs.split(',')[0].trim().split('-')[0];
    if(defaultLang && ['en', 'zh', 'vn', 'ja', 'ko'].includes(defaultLang)){
        return defaultLang
    }
    return undefined
}


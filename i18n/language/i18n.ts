import { createI18n } from 'vue-i18n'
import zhTW from '@/i18n/language/tw.json'
import enUS from '@/i18n/language/en.json'

type Locales = 'zh-TW' | 'en-US'
const messages: Record<Locales, any> = {
    'zh-TW': zhTW,
    'en-US': enUS
}

export const i18n = createI18n({
    legacy: false,
    locale: 'zh-TW',
    fallbackLocale: 'en-US',  // 改成官方標準 locale
    messages
})
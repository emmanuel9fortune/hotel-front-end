import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'

import ar from '../src/i18n/ar.json'
import bn from '../src/i18n/bn.json'
import de from '../src/i18n/de.json'
import en from '../src/i18n/en.json'
import es from '../src/i18n/es.json'
import fr from '../src/i18n/fr.json'
import hi from '../src/i18n/hi.json'
import it from '../src/i18n/it.json'
import ja from '../src/i18n/ja.json'
import ko from '../src/i18n/ko.json'
import nl from '../src/i18n/nl.json'
import pt from '../src/i18n/pt.json'
import ru from '../src/i18n/ru.json'
import sw from '../src/i18n/sw.json'

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
    resources:{
        ar: {translation: ar},
        bn: {translation: bn},
        de: {translation: de},
        en: {translation: en},
        es: {translation: es},
        fr: {translation: fr},
        hi: {translation: hi},
        it: {translation: it},
        ja: {translation: ja},
        ko: {translation: ko},
        nl: {translation: nl},
        pt: {translation: pt},
        ru: {translation: ru},
        sw: {translation: sw},
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng:'en',
    interpolation: {
        escapeValue: false,
        loadPath: "/src/i18n/en.json"
    }
})

export default i18n
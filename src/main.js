import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import langs from './lang'

Vue.config.productionTip = false
require('@/assets/styles/main.scss')

Vue.use(VueI18n)

const messages = {
  English: langs.en,
  German: langs.de,
  Norwegian: langs.no,
  Swedish: langs.sv,
  Italian: langs.it,
  Spanish: langs.es
}

const setPercentDefaults = (a, b, c, d) => {
  const percent1 = localStorage.getItem('percent1')
  const percent2 = localStorage.getItem('percent1')
  const percent3 = localStorage.getItem('percent1')
  const percent4 = localStorage.getItem('percent1')

  if (percent1 || percent2 || percent3 || percent4 ) return

  localStorage.setItem('percent1', a)
  localStorage.setItem('percent2', b)
  localStorage.setItem('percent3', c)
  localStorage.setItem('percent4', d)
}

let chosenLanguage = JSON.parse(localStorage.getItem('language'))
if (chosenLanguage === null) {
  if (navigator.language === 'de-DE') {
    chosenLanguage = 'German'
    setPercentDefaults(5, 7, 16, 19)
    localStorage.setItem('currency', JSON.stringify("€"))
  } else if (navigator.language === 'en-GB') {
    chosenLanguage = 'English'
    setPercentDefaults(4, 5, 12, 20)
    localStorage.setItem('currency', JSON.stringify("£"))
  } else if (navigator.language === 'en-US') {
    chosenLanguage = 'English'
    setPercentDefaults(4, 5, 10, 12)
    localStorage.setItem('currency', JSON.stringify("$"))
  } else if (navigator.language === 'no') {
    chosenLanguage = 'Norwegian'
    setPercentDefaults(10, 12, 15, 25)
    localStorage.setItem('currency', JSON.stringify("kr"))
  } else if (navigator.language === 'sv') {
    chosenLanguage = 'Swedish'
    setPercentDefaults(6, 10, 12, 25)
    localStorage.setItem('currency', JSON.stringify("kr"))
  } else if (navigator.language === 'it') {
    chosenLanguage = 'Italian'
    setPercentDefaults(4, 5, 10, 22)
    localStorage.setItem('currency', JSON.stringify("€"))
  } else if (navigator.language === 'es') {
    chosenLanguage = 'Spanish'
    setPercentDefaults(4, 5, 10, 21)
    localStorage.setItem('currency', JSON.stringify("€"))
  } else {
    chosenLanguage = 'English'
  }
  localStorage.setItem('language', JSON.stringify(chosenLanguage))
}

const i18n = new VueI18n({
  locale: chosenLanguage, // set locale
  messages // set locale messages
})


new Vue({
  i18n,
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

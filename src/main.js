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
  German: langs.de
}

let chosenLanguage = JSON.parse(localStorage.getItem('language'))
if (chosenLanguage === null) {
  if (navigator.language === 'de-DE') {
    chosenLanguage = 'German'
    localStorage.setItem('currency', JSON.stringify("€"))
  } else if (navigator.language === 'en-GB') {
    chosenLanguage = 'English'
    localStorage.setItem('currency', JSON.stringify("£"))
  } else if (navigator.language === 'en-US') {
    chosenLanguage = 'English'
    localStorage.setItem('currency', JSON.stringify("$"))
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

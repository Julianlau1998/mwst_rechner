<template>
  <div class="settings-page">
    <div class="is-settings-box">
        <h1 class="header is-size-2 is-size-3-mobile mt-5">
            {{ $t('settings.title') }}
        </h1>

        <div class="columns is-justify-content-center is-mobile is-align-items-center mb-6 mt-2">
            <div class="column is-3-desktop is-4-tablet is-5-mobile">
                <div class="is-size-4">
                    {{ $t('settings.language') }}
                </div>
            </div>
            <div class="column is-3-desktop is-4-tablet is-5-mobile">
                <select
                    v-model="selectedLanguage"
                    class="select"
                    id="language"
                >
                    <option
                    v-for="(lang, i) in langs" :key="`Lang${i}`"
                    :value="lang"
                    >
                        {{ lang }}
                    </option>
                </select>
            </div>
        </div>
      <div
          class="columns is-justify-content-center is-mobile is-align-items-center mb-5-5"
          :class="iosLiteApp ? 'mt-negative-5-5' : 'mt-negative-5'"
      >
        <div class="column is-12">
          <div class="is-size-4">
            {{ $t('settings.defaults') }}:
          </div>
        </div>
      </div>
      <div
          class="columns is-justify-content-center is-mobile is-align-items-center mt-negative-6"
          :class="iosLiteApp ? 'mb-3' : 'mb-6'"
      >
        <div class="column is-2-desktop is-2-tablet is-2-mobile">
          <input type="number" class="input is-small" v-model="percent1" />
        </div>
        <div class="column is-2-desktop is-2-tablet is-2-mobile">
          <input type="number" class="input is-small" v-model="percent2" />
        </div>
        <div class="column is-2-desktop is-2-tablet is-2-mobile">
          <input type="number" class="input is-small" v-model="percent3" />
        </div>
        <div class="column is-2-desktop is-2-tablet is-2-mobile">
          <input type="number" class="input is-small" v-model="percent4" />
        </div>
      </div>
      <button
          v-if="iosLiteApp"
          @click="webviewTrigger"
          class="button is-ads-button is-border-secondary mb-5-5"
      >
        {{ $t('calculator.removeAds') }}
      </button>
    </div>
    <button @click="home" class="button is-primary is-home-button mt-5-5">
        {{ $t('settings.home') }}
    </button>
  </div>
</template>

<script>
export default {
    name: 'Settings-view',
    data () {
        return {
            currency: '',
            language: '',
            langs: ['English', 'German', 'Norwegian', 'Swedish', 'Italian', 'Spanish', 'French'],
            selectedLanguage: '',
            percent1: 5,
            percent2: 7,
            percent3: 16,
            percent4: 19
        }
    },
    created () {
        const localCurrency = localStorage.getItem('currency')
        if (localCurrency) {
            this.currency = JSON.parse(localCurrency)
        }
        this.selectedLanguage = localStorage.getItem('language')
        if (this.selectedLanguage) {
          this.selectedLanguage = JSON.parse(this.selectedLanguage)
        } else {
          this.selectedLanguage = ''
        }

      const percent1 = localStorage.getItem('percent1')
      if (percent1) {
        this.percent1 = JSON.parse(percent1)
      }
      const percent2 = localStorage.getItem('percent2')
      if (percent2) {
        this.percent2 = JSON.parse(percent2)
      }
      const percent3 = localStorage.getItem('percent3')
      if (percent3) {
        this.percent3 = JSON.parse(percent3)
      }
      const percent4 = localStorage.getItem('percent4')
      if (percent4) {
        this.percent4 = JSON.parse(percent4)
      }
    },
    watch: {
        selectedLanguage (val) {
          this.$i18n.locale = val
          localStorage.setItem('language', JSON.stringify(val))
        },
        percent1 (val) {
          localStorage.setItem('percent1', JSON.stringify(val))
        },
        percent2 (val) {
          localStorage.setItem('percent2', JSON.stringify(val))
        },
        percent3 (val) {
          localStorage.setItem('percent3', JSON.stringify(val))
        },
        percent4 (val) {
          localStorage.setItem('percent4', JSON.stringify(val))
        }
    },
    computed: {
      iosLiteApp () {
        return window.webkit && window.webkit.messageHandlers
      }
    },
    methods: {
        home () {
            this.$router.push('/')
        },
        webviewTrigger () {
          if (this.iosLiteApp && window.webkit.messageHandlers.webviewTrigger) {
            window.webkit.messageHandlers.webviewTrigger.postMessage({
              "message": 'open AppStore:'
            });
          }
        }
    }
}
</script>

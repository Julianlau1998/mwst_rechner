<template>
  <div class="calculator is-flex-center mt-2">
    <div class="field-5 pb-5" ref="calculator">
      <div class="control">
        <div class="columns is-mobile is-justify-content-center is-align--center mt-2">
          <div class="column is-6 is-result-columns">
            <label for="price" class="is-size-4">
              {{ $t('calculator.netto') }}:
            </label>
          </div>
          <div class="column is-6 is-result-columns">
            <input
                id="netto"
                :value="netto"
                @input="nettoInput($event.target.value)"
                class="input mt-1 is-input"
                type="number"
                placeholder="0"
            >
          </div>
        </div>
      </div>
      <div class="control mt-4">
        <div class="columns is-mobile is-justify-content-center is-align-items-center">
          <div class="column is-6">
            <label for="shipping" class="is-size-4">
              {{ $t('calculator.percent') }}:
            </label>
          </div>
          <div class="column is-6">
            <input
                id="percent"
                :value="percent"
                @input="percentInput($event.target.value)"
                class="input mt-1 is-input"
                type="number"
                placeholder="0"
            >
          </div>
        </div>
      </div>
      <div class="control mt-4">
        <div class="columns is-mobile is-justify-content-center is-align-items-center">
          <div class="column is-6">
            <label for="shipping" class="is-size-4">
              {{ $t('calculator.tax') }}:
            </label>
          </div>
          <div class="column is-6">
            <input
                id="tax"
                :value="tax"
                @input="taxInput($event.target.value)"
                class="input mt-1 is-input"
                type="number"
                placeholder="0"
            >
          </div>
        </div>
      </div>
      <div class="control mt-4">
        <div class="columns is-mobile is-justify-content-center is-align-items-center">
          <div class="column is-6">
            <label for="shipping" class="is-size-4">
              {{ $t('calculator.brutto') }}:
            </label>
          </div>
          <div class="column is-6">
            <input
                id="brutto"
                :value="brutto"
                @input="bruttoInput($event.target.value)"
                class="input mt-1 is-input"
                type="number"
                placeholder="0"
            >
          </div>
        </div>
      </div>
      <div class="hr mt-6 mb-6" />
      <button @click="percentInput(percent1)" class="button is-primary" :class="percent==percent1 ? 'is-selected' : ''">
        {{ percent1 }}%
      </button>
      <button @click="percentInput(percent2)" class="button is-primary" :class="percent==percent2 ? 'is-selected' : ''">
        {{ percent2 }}%
      </button>
      <button @click="percentInput(percent3)" class="button is-primary" :class="percent==percent3 ? 'is-selected' : ''">
        {{ percent3 }}%
      </button>
      <button @click="percentInput(percent4)" class="button is-primary" :class="percent==percent4 ? 'is-selected' : ''">
        {{ percent4 }}%
      </button>
    </div>
    <button
        v-if="iosLiteApp"
        @click="webviewTrigger"
        class="button is-ads-button is-border-secondary mt-5"
    >
      {{ $t('calculator.removeAds') }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Calculator-bmi",
  data () {
    return {
      netto: 100,
      percent: 19,
      tax: 19,
      brutto: 119,
      percent1: 5,
      percent2: 7,
      percent3: 16,
      percent4: 19
    }
  },
  computed: {
    iosLiteApp () {
      return window.webkit && window.webkit.messageHandlers
    }
  },
  created() {
    const percent = localStorage.getItem('percent')
    if (percent) {
      this.percent = JSON.parse(percent)
      this.percentInput(this.percent)
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
  methods: {
    nettoInput (val) {
      this.netto = val
      val = parseFloat(val)
      this.brutto = val + (val * parseFloat(this.percent) / 100)
      this.tax = val * parseFloat(this.percent) / 100

      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.toggleMessageHandler) {
        window.webkit.messageHandlers.toggleMessageHandler.postMessage({
          "message": `this is a test: ${this.tax}`
        });
      }
    },
    percentInput (val) {
      this.percent = val
      val = parseFloat(val)
      localStorage.setItem('percent', JSON.stringify(val))
      this.brutto = this.rounded(parseFloat(this.netto) + (parseFloat(this.netto) * val / 100))
      this.tax = this.rounded(parseFloat(this.netto) * val / 100)
    },
    taxInput (val) {
      this.tax = val
      val = parseFloat(val)
      this.percent = this.rounded(val/(parseFloat(this.netto)/100))
      this.brutto = this.rounded(parseFloat(this.netto) + (parseFloat(this.netto) * val / 100))
    },
    bruttoInput (val) {
      this.brutto = val
      val = parseFloat(val)
      this.netto = this.rounded(val/(100 + parseFloat(this.percent)) * 100)
    },
    rounded (val) {
      return (Math.round(val * 100)/100).toFixed(2)
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

<template>
  <div class="calculator is-flex-center mt-2">
    <div class="field-5 pb-5" ref="calculator">
      <div class="control">
        <div class="columns is-mobile is-justify-content-center is-align--center mt-2">
          <div class="column is-6 is-result-columns">
            <label for="price" class="is-size-4">
              Netto:
            </label>
          </div>
          <div class="column is-6 is-result-columns">
            <input
                id="netto"
                :value="rounded(netto)"
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
              Prozentsatz:
            </label>
          </div>
          <div class="column is-6">
            <input
                id="percent"
                :value="rounded(percent)"
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
              MwSt:
            </label>
          </div>
          <div class="column is-6">
            <input
                id="tax"
                :value="rounded(tax)"
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
              Brutto:
            </label>
          </div>
          <div class="column is-6">
            <input
                id="brutto"
                :value="rounded(brutto)"
                @input="bruttoInput($event.target.value)"
                class="input mt-1 is-input"
                type="number"
                placeholder="0"
            >
          </div>
        </div>
      </div>
      <div class="hr mt-6 mb-6" />
      <button @click="percentInput(5)" class="button is-primary">
        5%
      </button>
      <button @click="percentInput(7)" class="button is-primary">
        7%
      </button>
      <button @click="percentInput(16)" class="button is-primary">
        16%
      </button>
      <button @click="percentInput(19)" class="button is-primary">
        19%
      </button>
    </div>
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
      brutto: 119
    }
  },
  methods: {
    nettoInput (val) {
      val = parseFloat(val)
      this.netto = val
      this.brutto = val + (val * this.percent / 100)
      this.tax = val * this.percent / 100

      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.toggleMessageHandler) {
        window.webkit.messageHandlers.toggleMessageHandler.postMessage({
          "message": `this is a test: ${this.tax}`
        });
      }
    },
    percentInput (val) {
      val = parseFloat(val)
      this.percent = val
      this.brutto = this.netto + (this.netto * val / 100)
      this.tax = this.netto * val / 100
    },
    taxInput (val) {
      val = parseFloat(val)
      this.tax = val
      this.percent = (val/(this.netto/100))
      this.brutto = this.netto + (this.netto * val / 100)
    },
    bruttoInput (val) {
      val = parseFloat(val)
      this.brutto = val
      this.netto = (val/(100 + this.percent) * 100)
    },
    rounded (val) {
      return (Math.round(val * 100)/100).toFixed(2)
    }
  }
}
</script>
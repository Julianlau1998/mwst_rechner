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
              Prozentsatz:
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
              MwSt:
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
              Brutto:
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
      this.netto = val
      val = parseFloat(val)
      this.brutto = val + (val * parseFloat(this.percent) / 100)
      this.tax = val * parseFloat(this.percent) / 100
    },
    percentInput (val) {
      this.percent = val
      val = parseFloat(val)
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
    }
  }
}
</script>
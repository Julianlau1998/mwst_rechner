<template>
  <div class="home">
    <Calculator @click="addClick" />
  </div>
</template>

<script>
import Calculator from "@/components/Calculator/Calculator"

export default {
  name: 'HomeView',
  components: { Calculator },
  data () {
    return {
      clicks: 0
    }
  },
  created () {
    this.clicks = parseInt(localStorage.getItem('clicks'))
    if(this.clicks == null || isNaN(this.clicks)) {
        this.clicks = 0
    }
  },
  computed: {
    iOS () {
      return this.$store.state.iOS
    },
    iosLiteApp () {
      return window.webkit && window.webkit.messageHandlers
    }
  },
  methods: {
    addClick () {
      this.clicks += 1
      localStorage.setItem('clicks', this.clicks)
      if(this.clicks >= 6) {
        this.showInterstitial()
        localStorage.setItem('clicks', 0)
        this.clicks = 0
      }
    },
    showInterstitial () {
      if (this.iosLiteApp) {
          window.webkit.messageHandlers.showInterstitial.postMessage({
            "message": 'showInterstitial'
          })
        }
    }
  } 
}
</script>

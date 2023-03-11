<template>
  <div class="home">
    <Calculator />
    <AdCard v-if="!iOS" class="mt-5" />
  </div>
</template>

<script>
import Calculator from "@/components/Calculator/Calculator"
import AdCard from "@/components/ads/AdCard"

export default {
  name: 'HomeView',
  components: { Calculator, AdCard },
  computed: {
    iOS () {
      return this.$store.state.iOS
    }
  }
}
</script>

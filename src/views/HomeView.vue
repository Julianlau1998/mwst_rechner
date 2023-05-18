<template>
  <div class="home">
    <Calculator />
  </div>
</template>

<script>
import Calculator from "@/components/Calculator/Calculator"

export default {
  name: 'HomeView',
  components: { Calculator },
  computed: {
    iOS () {
      return this.$store.state.iOS
    }
  }
}
</script>

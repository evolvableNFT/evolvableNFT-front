<template>
  <v-container class="meta-step-wrap">
    <v-stepper key="whiteListWorkflowStep" :value="stepval" alt-labels :outlined="false" elevation="0">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="stepval > 1"> Enter Project Infomation </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="stepval > 2"> Upload Address List </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable> Submit </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  name: 'WhiteListSteper',
  components: {},
  data() {
    return {
      stepval: 1,
    }
  },
  computed: {
    // currStep: () => parseInt(this.stepval),
  },
  methods: {
    setStepValue(val) {
      if (val && val <= 3 && val > 0) {
        this.stepval = val
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>

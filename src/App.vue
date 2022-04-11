<template>
  <v-app>
    <v-app-bar class="meta-header" light :dense="ui.dense" fixed app clipped-right elevation="0" absolute>
      <MetaHeader />
    </v-app-bar>

    <MetaDrawer />

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-footer>
      <v-container>MetaDrop Labs</v-container>
    </v-footer>
  </v-app>
</template>

<script>
import MetaDrawer from '@comp/MetaDrawer.vue'
import MetaHeader from '@ui/head/MetaHead.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: { MetaDrawer, MetaHeader },
  data: () => ({
    dense: false,
    drawer: false,
  }),
  computed: {
    ...mapState(['ui']),
  },
  methods: {
    toggler() {
      this.drawer = !this.drawer
    },
  },
}
</script>
<style lang="scss" scoped>
.meta {
  &-header {
    position: fixed;
    background: transparent;
  }
}
</style>

<template>
  <v-navigation-drawer
    :value="rightDrawer"
    app
    right="right"
    clipped
    fixed
    disable-resize-watcher
    disable-route-watcher
    hide-overlay
    @input="drawerInputChanged"
  >
    <v-container fluid>
      <v-list-item key="metaMobileHead">
        {{ selectedAdddress || 'Open DApp in MetaMask' }}
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense class="">
        <v-list-item v-for="(m, idx) in navMenus" :key="'moMenu_' + idx" @click="navLinkHandler(m.path)">
          <v-list-item-icon>
            <v-icon v-text="m.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ m.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

const NavMenus = [
  {
    name: 'Home',
    path: '/',
    icon: 'mdi-home',
  },
  {
    name: 'Create Drop',
    path: '/drop/nft',
    icon: 'mdi-water-plus-outline',
  },
]
export default {
  name: 'MetaDrawer',
  components: {},
  data: () => ({
    right: true,
    navMenus: NavMenus,
  }),
  computed: {
    ...mapState('wal', ['selectedAdddress']),
    ...mapState('ui', ['drawer']),
    ...mapGetters('ui', ['rightDrawer']),
  },
  methods: {
    drawerInputChanged(v) {
      this.$store.dispatch('ui/toggleDrawer', v)
    },
    navLinkHandler(path) {
      try {
        if (!this.selectedAdddress && path === '/drop/nft') throw new Error('Required connect your wallet.')
        this.$router.replace(path)
        this.$store.dispatch('ui/hiddenDrawer')
      } catch (ex) {
        this.$toast(ex.message, 'warn', 3000)
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>

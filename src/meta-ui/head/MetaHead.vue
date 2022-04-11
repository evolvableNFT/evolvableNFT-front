<template>
  <v-container>
    <v-row>
      <MetaLogo />
      <MetaNavLinks />
      <v-spacer></v-spacer>

      <MetaUserMenu :class-name="ui.xsHideCls" />
      <NotificationBell :class-name="ui.xsHideCls" />
      <v-app-bar-nav-icon :class="ui.xsShowCls" @click="toggleHandler"></v-app-bar-nav-icon>
    </v-row>
  </v-container>
</template>

<script>
import MetaLogo from '@ui/head/MetaLogo.vue'
import MetaNavLinks from '@ui/head/NavLinks.vue'
import MetaUserMenu from '@ui/wallet/MetaUserMenu.vue'
import NotificationBell from '@comp/NotificationBell.vue'

import { mapState } from 'vuex'
export default {
  name: 'MetaHeader',
  components: { MetaLogo, MetaNavLinks, NotificationBell, MetaUserMenu },
  data() {
    return {
      opacity: 0,
    }
  },
  computed: {
    ...mapState(['ui']),
  },

  methods: {
    toggleHandler() {
      this.$store.dispatch('ui/toggleDrawer')
    },
    handleScroller() {
      let h = this.height || 135
      let vm = this

      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop <= 20) {
        vm.$store.dispatch('setOverCls', '')
      } else if (scrollTop > 20 && scrollTop <= h) {
        vm.$store.dispatch('setOverCls', 'meta-h-over35')
      } else {
        vm.$store.dispatch('setOverCls', 'meta-h-over')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.meta {
  &-header {
    position: fixed;
  }
}
</style>

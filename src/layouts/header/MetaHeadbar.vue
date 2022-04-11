<template>
  <v-app-bar :clipped-left="clipped" fixed app elevation="0" class="meta-topbar" :class="metaHeadOver" :height="height">
    <v-container class="meta-headbar d-md-inline-flex align-md-center d-sm-flex">
      <MetaLogo />
      <MetaNavMenus />
      <v-spacer class="d-none d-md-flex" />
      <!-- <MetaTopMenu /> -->
      <!-- <MetamaskDropdown v-if="!selectedAddress" key="connectBtn" />
      <AccountDropdown v-if="!!selectedAddress" key="accountBtn" /> -->
      <!-- -->
      <nav class="meta-mainnav">
        <ul>
          <li class="mainnav__wallet">
            <MetaTopMenu class-name="d-none d-sm-flex" />
          </li>
          <li class="mainnav__bell">
            <NotificationBell class-name="d-none d-sm-flex" />
          </li>
          <li class="mainnav__menu">
            <v-btn icon class="d-flex d-sm-none">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </li>
        </ul>
      </nav>
    </v-container>
  </v-app-bar>
</template>

<script>
import MetaLogo from '@comp/MetaLogo.vue'
import MetaNavMenus from '@/layouts/header/NavMenus.vue'
import NotificationBell from '@comp/NotificationBell.vue'
import MetaTopMenu from '@/meta-ui/wallet/MetaUserMenu.vue'

import { mapState, mapGetters } from 'vuex'
export default {
  name: 'MetaHeadbar',
  components: { MetaLogo, MetaNavMenus, MetaTopMenu, NotificationBell },
  data() {
    return {
      height: 135,
      clipped: false,
      drawer: false,
      fixed: false,
    }
  },
  computed: {
    ...mapState('wal', ['selectedAddress']),
    ...mapGetters('web3', ['hasConnected']),
    ...mapGetters(['metaHeadOver']),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroller)
  },
  methods: {
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
nav.meta {
  &-mainnav {
    right: 0.5em;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);

    ul {
      display: block;
      list-style-type: disc;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;

      & > li {
        list-style: none;
        padding: 0;
        margin: 0;
        display: inline-block;
        vertical-align: middle;

        &:not(:first-child) {
          padding-left: 0.45em;
        }
      }
    }
  }
}

.meta-topbar {
  &.theme--light.v-app-bar.v-toolbar.v-sheet {
    background-color: transparent;
    &.meta-h-over35 {
      background-color: rgba(#f5f5f5, 0.35);
      border-bottom: 1px solid #f5f5f5;
    }
    &.meta-h-over {
      background-color: rgba(#f5f5f5, 0.95);
      border-bottom: 1px solid #f5f5f5;
    }
  }
}
</style>

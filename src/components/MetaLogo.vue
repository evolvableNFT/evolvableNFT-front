<template>
  <div class="meta-logo-container py-0">
    <v-app-bar-nav-icon @click="homeHandle">
      <img :src="LogoImg" class="meta-logo" @click="homeHandle" />
    </v-app-bar-nav-icon>
    <span class="meta-logo-title d-none d-md-flex">{{ metaTitle }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LogoImg from '@assets/drop.svg'
export default {
  name: 'MetaLogo',
  components: {},
  data() {
    return { LogoImg }
  },
  computed: {
    ...mapGetters(['metaTitle']),
  },
  methods: {
    homeHandle() {
      this.$router.push('/')
    },
  },
}
</script>
<style lang="scss" scoped>
.meta {
  &-logo {
    &-container {
      flex: 0 0 auto;
      display: inline-flex;
      padding: 0;
      padding-right: 1em;
      align-items: center;
      align-self: end;
    }

    &-title {
      margin-left: 1em;
      font-size: 36px;
      font-weight: 500;
      line-height: 40px;
    }
  }
}
</style>

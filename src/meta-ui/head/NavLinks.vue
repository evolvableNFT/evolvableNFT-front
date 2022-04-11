<template>
  <nav class="meta-links px-2 ms-4" :class="ui.xsHideCls">
    <ul>
      <li>
        <a href="#" class="nav-link" @click="navLinkHandler('/')"><span>Home</span></a>
      </li>
      <li>
        <a href="#" class="nav-link" @click="navLinkHandler('/drop/nft')"><span>Create Drop</span></a>
      </li>
      <li>
        <a href="#" class="nav-link" @click="navLinkHandler('/rule/credentails')"><span>Credentails</span></a>
      </li>
      <li>
        <a href="#" class="nav-link" @click="navLinkHandler('/u/nft/list')"><span>My NFTs</span></a>
      </li>
      <!-- <li>
        <a href="#" class="nav-link"><span>NFT</span></a>
      </li> -->
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MetaNavLinks',
  components: {},
  data: () => ({}),
  computed: { ...mapState(['ui']) },
  methods: {
    navLinkHandler(pathname) {
      if (pathname === this.$route.pathname) return
      this.$router.push(pathname)
    },
  },
}
</script>
<style lang="scss" scoped>
nav.meta {
  &-links {
    vertical-align: middle;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    & > ul {
      list-style-type: none;
      overflow: hidden;
      padding: 0;
      margin: 0;

      & > li {
        display: inline;
        text-decoration: none;
        list-style: none;
      }
    }

    a.nav-link {
      transition-property: box-shadow, transform, opacity;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
      :hover {
        color: #333333;
        font-size: 1.05rem;
      }
      color: #5c5c5c;
      & > span {
        padding: 0 16px;
      }
    }
  }
}
</style>

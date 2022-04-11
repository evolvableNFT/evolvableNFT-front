<template>
  <div class="meta-navmenus">
    <v-btn plain>Home</v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MetaNavMenus',
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.meta {
  &-navmenus {
    flex: 0 0 auto;
    height: 100%;
    border: 1px solid #ee8;
  }
}
</style>

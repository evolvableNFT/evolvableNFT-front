<template>
  <span class="meta-loading">
    <div class="meta-dot"></div>
    <div class="meta-dot"></div>
    <div class="meta-dot"></div>
  </span>
</template>

<script>
export default {
  name: 'MetaLoading',
  components: {},
  data: () => ({}),
  computed: {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.meta {
  &-loading {
    float: left;
    text-align: center;
    width: 100%;
    border: 1px solid rebeccapurple;

    & > .meta-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 6px;

      &:nth-last-child(3) {
        margin: 2px auto;
        background: rgba(255, 174, 47, 1);
        animation: dot-down 0.9s 0.1s linear infinite;
        -webkit-animation: dot-down 0.9s 0.1s linear infinite;
      }

      &:nth-last-child(2) {
        margin: 2px auto;
        background: rgba(2, 184, 148, 1);
        animation: dot-down 0.9s 0.3s linear infinite;
        -webkit-animation: dot-down 0.9s 0.3s linear infinite;
      }

      &:nth-last-child(1) {
        margin: 2px auto;
        background: rgba(242, 133, 82, 1);
        animation: dot-down 0.9s 0.6s linear infinite;
        -webkit-animation: dot-down 0.9s 0.6s linear infinite;
      }
    }
  }
}
</style>

<template>
  <div v-if="showToast" id="__meta_toaster__" key="metaToaster" class="meta-toaster">
    <div class="meta-toaster-close-icon" @click="closeToaster">
      <span>
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" @click="closeToaster">
          <path
            fill="currentColor"
            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
          />
        </svg>
      </span>
    </div>
    <div class="meta-toaster__inner" :class="`toast-${type}`">
      <div class="meta-toaster__icon">
        <div class="icon">
          <img :src="iconSrc" />
        </div>
      </div>
      <div class="meta-toaster__content">
        <span>{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import messageIcon from '../svgs/tips.svg'
import successIcon from '../svgs/success.svg'
import failIcon from '../svgs/fail.svg'
import warnIcon from '../svgs/warning.svg'
import signedIcon from '../svgs/signed.svg'
export default {
  name: 'MetaToast',
  components: {},
  data: () => ({
    icons: {
      message: messageIcon,
      fail: failIcon,
      warn: warnIcon,
      success: successIcon,
      signed: signedIcon,
    },
    showToast: true,
    type: 'normal',
    message: '',
    duration: 5000,
    cb: () => {},
  }),
  computed: {
    iconSrc() {
      const type = this.type
      switch (type) {
        case 'success':
          return this.icons.success
        case 'warn':
          return this.icons.warn
        case 'fail':
          return this.icons.fail
        case 'signed':
          return this.icons.signed
        default:
          return this.icons.message
      }
    },
  },
  beforeUnmount() {
    if (typeof this.cb === 'function') {
      console.log('Call back .......')
      this.cb()
    }
  },
  methods: {
    closeToaster() {
      const self = document.querySelector('#__meta_toaster__')
      if (self) {
        typeof this.cb === 'function' && this.cb()
        self.remove()
      } else {
        typeof this.cb === 'function' && this.cb()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.meta {
  &-toaster {
    position: fixed;
    z-index: 9999;
    min-width: 360px;
    max-width: 450px;
    padding-right: 10px;
    padding: 10px 8px 0 0;

    left: 50%;
    top: 50%;
    background: transparent;

    transform: translate(-50%, -50%);
    animation: show-toast 0.2s;
    color: #909399;
    overflow: hidden;
    display: flex;
    align-items: center;

    &-close-icon {
      position: fixed;
      float: right;
      display: inline;
      top: 0;
      right: 0;
      margin-top: 0px;
      margin-right: 2px;
      z-index: 100000;
      color: #909399;
      cursor: pointer;
    }

    .icon {
      padding-right: 4px;
      & > img {
        width: 32px;
        height: 32px;
      }
    }

    &__inner {
      background: rgb(233, 233, 235);
      padding: 8px;
      border-radius: 10px;
      flex: 1 1 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;

      &.toast-message {
        color: white;
        background: linear-gradient(217deg, #7917d3 0%, #0362c3 100%);
      }

      &.toast-success {
        color: rgba(0, 202, 155, 1);
        background: rgba(0, 202, 155, 0.3);
      }

      &.toast-warn {
        color: #e6a23c;
        background: rgb(250, 236, 216);
      }

      &.toast-fail {
        color: #f56c6c;
        background: rgb(253, 226, 226);
      }

      &.toast-signed {
        color: #515151;
        background: rgb(246, 246, 246);
      }
    }

    &__content {
      padding-left: 0.25em;
      font-size: 0.85rem;

      span {
        word-break: break-all;
      }
    }
  }
}
@keyframes show-toast {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

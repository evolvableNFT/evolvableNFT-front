<template>
  <v-menu
    ref="accountDropdownBtn"
    v-model="opened"
    content-class="mm-menudrop"
    offset-y
    width="260"
    rounded="30px"
    open-delay="200"
    right
    absoluteorigin="center center"
    transition="scale-transition"
    :close-on-content-click="false"
    nudge-bottom="20"
    nudge-right="-90"
    :eager="true"
  >
    <template #activator="{ on, attrs }">
      <v-btn rounded outlined text color="primary" v-bind="attrs" x-large width="260" v-on="on">{{
        shortAddress
      }}</v-btn>
    </template>
    <v-sheet class="mm-modal" width="350" height="530" elevation="0">
      <div class="mm-inner-close">
        <div class="title">MetaDrops</div>

        <v-icon large @click="closeWalletModal">mdi-close</v-icon>
      </div>
      <div class="mm-inner-wrap">
        <div class="mm-modal-btns">
          <div class="mm-menus-container metamask-bg" @click="getCredentailHandler">
            <span class="text">获取参与资格</span>
          </div>
          <div class="mm-menus-container wallet-connbg" @click="createDropHandler">
            <span class="text">我要发起空投</span>
          </div>
          <div class="mm-menus-container coinbase-box" @click="getCredentailHandler">
            <span class="text">查看我获得的空投</span>
          </div>
          <div class="mm-menus-container coinbase-box" @click="getCredentailHandler">
            <span class="text">查看我发起的空投</span>
          </div>
        </div>

        <div class="meta-space"></div>
        <div class="mm-bottom-container">
          <div>
            <p>想要免费获取项目空投Token?</p>
          </div>
          <div>
            <p>需要在平台报名登记</p>
          </div>
        </div>
      </div>
    </v-sheet>
  </v-menu>
</template>

<script>
import mmIcon from '@assets/icons/metamask.png'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'AccountDrop',
  components: {},
  data() {
    return {
      mmIcon,
      opened: false,
    }
  },
  computed: {
    ...mapState('wal', ['selectedAddress']),
    ...mapGetters('wal', ['shortAddress']),
  },
  methods: {
    closeWalletModal() {
      this.opened = false
    },
    getCredentailHandler() {},
    createDropHandler() {
      this.$router.push('/drop/nft')
    },
  },
}
</script>
<style lang="scss" scoped>
.mm {
  &-menudrop {
    border-radius: 26px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: stretch;
    align-items: stretch;
  }

  &-modal {
    width: 350;
    height: 530;

    &-header {
      color: #333;
      text-align: center;

      h3 {
        line-height: 28px;
        font-weight: 700;
        margin-bottom: 18px;
      }

      p {
        margin-bottom: 30px;
      }
    }
  }

  &-inner-wrap {
    flex: 1 1 100%;
    width: 100%;
    height: calc(100% - 40px);
    padding: 6px 20px;
    // padding-top: 32px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;

    & > div.meta-space {
      flex: 1 1 auto;
    }

    & > div.mm-modal-btns {
      flex: 1 1 auto;
    }

    div.mm-menus-container {
      width: 100%;
      height: 60px;
      border-radius: 12px;
      padding: 12px 24px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 600;
      cursor: pointer;

      span {
        color: #fff;
        font-weight: 600;
        font-size: 18px;
      }

      img {
        width: 40px;
        height: 40px;
      }

      &:first-child {
        margin-top: 24px;
      }

      &:not(:last-child) {
        margin-bottom: 12px;
      }

      span.text {
        font-size: 16px;
      }

      &.metamask-bg {
        background: linear-gradient(267.54deg, rgb(255, 220, 36) 1.63%, rgb(255, 92, 0) 98.05%);
      }

      &.wallet-connbg {
        background: linear-gradient(267.56deg, rgb(5, 0, 255) 0%, rgb(143, 0, 255) 97.07%);
      }

      &.coinbase-box {
        border: 1px solid #eaeaea;
        color: #333;
        span.text {
          color: #333;
          font-size: 16px;
        }
      }
    }
  }

  &-inner-close {
    width: 100%;
    float: right;
    z-index: 999;
    padding-top: 4px;
    padding-right: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    & > div.title {
      padding-left: 12px;
      padding-top: 10px;
      line-height: 24px;
      font-weight: 600;
    }
  }

  &-bottom-container {
    padding-top: 24px;
    text-align: center;
    font-size: 15px;
    p {
      line-height: 18px;
    }
  }
}
</style>

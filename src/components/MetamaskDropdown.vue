<template>
  <v-menu
    ref="metamaskDropdownBtn"
    v-model="opened"
    class="d-none d-md-flex"
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
      <v-btn rounded :color="hasConnected ? '' : 'primary'" v-bind="attrs" x-large width="260" v-on="on">{{
        metamaskBtnText
      }}</v-btn>
    </template>

    <v-sheet class="mm-modal" width="350" height="530" elevation="0">
      <div class="mm-inner-close">
        <v-icon large @click="closeWalletModal">mdi-close</v-icon>
      </div>
      <div class="mm-inner-wrap">
        <div class="mm-modal-header">
          <h3>{{ mmHeadText }}</h3>
          <p>{{ mmTipText }}</p>
        </div>

        <div class="mm-btn-container metamask-bg" @click="clickMetamaskHandler">
          <span class="text">{{ metamaskInjected ? '参与空投' : 'Download MetaMask' }}</span>
          <span>
            <v-img :src="mmIcon" alt="Metamask"></v-img>
          </span>
        </div>
        <!-- <div class="mm-btn-container wallet-connbg">
          <span class="text">Wallet Connect</span>
          <span>
            <v-img :src="walletIcon" alt="wallet"></v-img>
          </span>
        </div>

        <div class="mm-btn-container coinbase-box">
          <span class="text">Coinbase</span>
          <span>
            <v-img :src="coinbaseIcon" alt="coinbase"></v-img>
          </span>
        </div> -->
        <div class="meta-space"></div>
        <div class="mm-bottom-container">
          <div>
            <p>New to Ethereum?</p>
          </div>
          <div>
            <p>Learn more about wallets</p>
          </div>
        </div>
      </div>
    </v-sheet>
  </v-menu>
</template>

<script>
import mmIcon from '@assets/icons/metamask.png'
import walletIcon from '@assets/icons/wallet-conn.png'
import coinbaseIcon from '@assets/icons/coinbase.png'

import { mapGetters } from 'vuex'
import { METAMASK_DOWNLOAD_URL } from '@lib/metamask/constants'

import { connectMetamask } from '@lib/web3/metamask'
const SIGNUP_ROUTES = ['/signup', '/signup/index']
const DEF_CONNECT_TEXT = 'Connect Wallet'
export default {
  name: 'MetamaskDropdown',
  components: {},
  data() {
    return {
      mmIcon,
      walletIcon,
      coinbaseIcon,
      opened: false,
      metamaskBtnText: DEF_CONNECT_TEXT,
      mmHeadText: 'Connect your wallet',
      mmTipText: ' By connecting your wallet, you agree to our Terms of Service and our Privacy Policy. ',
    }
  },
  computed: {
    ...mapGetters('web3', ['metamaskInjected', 'hasConnected']),
  },
  methods: {
    closeWalletModal() {
      this.opened = false
    },
    async clickMetamaskHandler() {
      if (!this.metamaskInjected) {
        window.open(METAMASK_DOWNLOAD_URL, 'MetaMask Download')
        return
      } else {
        const vm = this
        connectMetamask()
          .then((resp) => {
            console.log(resp)
            // this.metamaskBtnText = resp.selectedAddress
            if (SIGNUP_ROUTES.find((v) => v === vm.$route.path)) {
              vm.$store.dispatch('wal/setWalletState', resp)
              vm.opened = false
            } else {
              vm.$router.push(SIGNUP_ROUTES[0], () => {
                vm.opened = false
              })
            }
          })
          .catch((e) => {
            console.log(e)
          })
      }
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

    & > div.mm-btn-container {
      width: 100%;
      height: 60px;
      border-radius: 12px;
      padding: 12px 24px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-weight: 600;
      cursor: pointer;

      img {
        width: 40px;
        height: 40px;
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
      }
    }
  }

  &-inner-close {
    float: right;
    z-index: 999;
    padding-top: 4px;
    padding-right: 4px;
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

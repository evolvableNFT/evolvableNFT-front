<template>
  <div>
    <v-btn
      v-if="!walletConnected"
      key="connectedWalletBtn"
      :loading="envChecking"
      color="primary"
      rounded
      width="220"
      :class="className"
      @click="unConnectHandler"
      >{{ metamaskInjected ? 'Connect Wallet' : 'MetaMask Unfound' }}</v-btn
    >
    <v-menu
      v-if="walletConnected"
      key="metaUserMenuBtn"
      ref="metaTopMenu"
      v-model="opened"
      content-class="muser-popover"
      v-bind="{ loading: true }"
      offset-y
      width="260"
      rounded="30px"
      open-delay="200"
      right
      absoluteorigin="center center"
      transition="scale-transition"
      :close-on-content-click="false"
      nudge-bottom="20"
      nudge-right="-130"
      :eager="true"
      persistent
    >
      <template #activator="{ on, attrs }">
        <v-btn :loading="envChecking" color="primary" rounded width="180" v-bind="attrs" :class="className" v-on="on">{{
          shortAddress
        }}</v-btn>
      </template>
      <v-sheet class="muser-popover__inner">
        <div class="muser-popover__header">
          <span class="mpopover-title">{{ shortAddress || 'My' }}</span>
          <v-icon @click="closeMuserPopoverHandler">mdi-close</v-icon>
        </div>
        <div class="muser-popover__content">
          <div class="muser-btnbox btn-createdrop" @click="createDropHandler">
            <span class="text">Create Drop NFT</span>
            <span>
              <v-img :src="dropSvg" alt="MetaDrop" :width="iconSize" :height="iconSize"></v-img>
            </span>
          </div>
          <div class="muser-btnbox btn-apply" @click="myNftHandler">
            <span class="text">NFTs I've got</span>
            <span>
              <v-img :src="monkeyNft" alt="NFTs" :width="iconSize - 4" :height="iconSize - 4"></v-img>
            </span>
          </div>

          <v-card
            v-if="!hasUserRegist"
            key="address_unregist"
            class="muser-regist__card"
            elevation="0"
            outlined
            rounded
          >
            <div class="form-tip">
              <span class="tip-text"> {{ registText }}</span>
            </div>
            <div class="muser-regist__form">
              <v-text-field dense label="Email" :value="inputEmail" @change="(v) => (inputEmail = v)"></v-text-field>
              <v-text-field v-model="inputtwitter" dense label="twitter"></v-text-field>
              <v-text-field v-model="inputDiscord" dense label="Discord"></v-text-field>
            </div>

            <div class="muser-regist__action">
              <v-btn small outlined color="#8f00ff" plain @click="registEmailHandler">Sign & Regist</v-btn>
            </div>
          </v-card>
          <v-card v-if="hasUserRegist" class="muser-regist__card" elevation="0" outlined rounded>
            <div class="form-tip">
              <span class="tip-text"> {{ registText }}</span>
            </div>
            <div class="muser-info">
              <div class="d-inline">
                <span class="label">Email :</span><span class="text">{{ userInfo.email || '' }}</span>
              </div>
              <div class="d-inline">
                <span class="label">twitter :</span><span class="text">{{ userInfo.twitter || '' }}</span>
              </div>
              <div class="d-inline">
                <span class="label">Discord :</span><span class="text">{{ userInfo.discord || '' }}</span>
              </div>
            </div>
          </v-card>
        </div>
        <div class="muser-popover__footer">
          <div>
            <span>New to Drop?</span>
          </div>
          <div>
            <span>Learn more about MetaDrops</span>
          </div>
        </div>
      </v-sheet>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { connectMetamask } from '@lib/web3/metamask'
import mmIcon from '@assets/icons/metamask.png'
import monkeyNft from '@assets/icons/monkey-nft.png'
import dropSvg from '@assets/drop.svg'

import { getWeb3js } from '@lib/web3'
import { signByPersonal } from '@lib/web3/sign-util'
import { METAMASK_DOWNLOAD_URL } from '@lib/metamask/constants'

const DEF_CONNECT_BTN_TEXT = 'Connect Wallet'
export default {
  name: 'MetaUserMenu',
  components: {},
  props: {
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      iconSize: 32,
      mmIcon,
      dropSvg,
      monkeyNft,
      btnText: DEF_CONNECT_BTN_TEXT,
      opened: false,
      registText: 'If you want to get a higher airdrop weight, please enter your info registration here.',
      inputEmail: '',
      inputtwitter: '',
      inputDiscord: '',
    }
  },
  computed: {
    ...mapGetters('web3', ['metamaskInjected', 'envChecking']),
    ...mapGetters('wal', ['walletConnected', 'shortAddress', 'hasUserRegist']),
    ...mapGetters(['getConnectBtn']),
    ...mapState('wal', ['selectedAddress', 'userInfo']),
  },
  watch: {},
  mounted() {},
  methods: {
    async unConnectHandler() {
      if (!this.metamaskInjected) {
        //TODO
        window.open(METAMASK_DOWNLOAD_URL, 'MetaMask')
        return
      } else {
        const vm = this
        connectMetamask()
          .then((resp) => {
            vm.$store.dispatch('wal/setWalletState', resp)

            vm.$store.dispatch('sol/updateDropNftBaseInfo', resp.chainId)
            console.log('>>>>>>>>>>>>>>>>>>>>', resp)
            vm.$store.dispatch('wal/loadUserInfo', resp.selectedAddress)
            // this.metamaskBtnText = resp.selectedAddress
            // if (SIGNUP_ROUTES.find((v) => v === vm.$route.path)) {
            //   vm.$store.dispatch('wal/setWalletState', resp)
            //   vm.opened = false
            // } else {
            //   vm.$router.push(SIGNUP_ROUTES[0], () => {
            //     vm.opened = false
            //   })
            // }
          })
          .catch((e) => {
            console.log(e)
            this.$toast(e.message, 'warn', 10000)
          })
      }
    },
    closeMuserPopoverHandler() {
      this.opened = false
    },
    createDropHandler() {
      this.$router.push('/drop/nft', () => {
        this.opened = false
      })
    },
    myNftHandler() {
      this.$toast('Come soon...', 'info', 3000)
      return
      // this.$router.push('/nfts/mine', () => {
      //   this.opened = false
      // })
    },
    async registEmailHandler() {
      if (!this.inputEmail) {
        this.$toast('Email required', 'warn', 3000)
        return
      }

      try {
        const opts = {
          selectedAddress: this.selectedAddress,
          email: this.inputEmail,
          twitter: this.inputtwitter || '',
          discord: this.inputDiscord || '',
        }

        const web3js = await getWeb3js()
        const postParams = await signByPersonal(web3js, opts)
        console.log('Regist>>>>>>>>>ex>>>>>>>>', postParams)
        const apiRet = await this.$api('user.registWithMail', postParams)
        const { code, msg, data } = apiRet
        console.log('Regist>>>opts>>>>>>>>>>>>>>', postParams, apiRet)
        if (code !== 0 || !data || !data.length) throw new Error(msg || 'regist fail')
        this.$store.dispatch('wal/updateUserInfo', data[0])

        this.$toast('Signed Success', 'success')
      } catch (ex) {
        console.log('Regist>>>>>>>>>ex>>>>>>>>', ex)
        this.$toast(`Signed fail.${ex.message}`, 'fail', 8000)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.muser {
  &-popover {
    width: 350px;
    height: 530px;
    background: transparent;

    &.v-menu__content {
      border-radius: 12px;
    }

    &__inner {
      flex: 1 1 100%;
      display: flex;
      flex-flow: column nowrap;
      height: 100%;
      padding: 2px 0px 10px 0px;

      & > div {
        padding-left: 24px;
        padding-right: 24px;

        &.muser-popover__header {
          padding-right: 2px;
          padding-left: 12px;
        }
      }
    }

    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px solid rgba(#ccc, 0.3);

      & > span.mpopover-title {
        font-size: 1rem;
      }
    }

    &__content {
      flex: 1 1 100%;
      padding-top: 24px;
      padding-bottom: 12px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;

      & > div.muser-btnbox {
        cursor: pointer;
        flex: 0 0 auto;
        width: 100%;
        line-height: 2.25rem;
        padding: 6px 12px;
        border-radius: 12px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        color: #fff;

        &:not(:last-child) {
          margin-bottom: 12px;
        }

        img {
          width: 40px;
          height: 40px;
        }

        &.btn-apply {
          background: linear-gradient(267.54deg, rgb(255, 220, 36) 1.63%, rgb(255, 92, 0) 98.05%);
        }

        &.btn-createdrop {
          background: linear-gradient(267.56deg, rgb(5, 0, 255) 0%, rgb(143, 0, 255) 97.07%);
        }

        &.btn-nfts {
          border: 1px solid #eaeaea;
          color: #333;
        }
      }

      div.muser-info {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;

        & > div {
          padding: 0 6px;
          & > span {
            font-size: 0.75rem;
            line-height: 1.05rem;
          }
        }

        span.label {
          font-weight: 300;
          color: rgba(0, 0, 0, 0.58);
        }

        span.text {
          color: rgba(0, 0, 0, 0.88);
        }
      }
    }

    &__footer {
      span {
        font-size: 0.75rem;
      }

      & > div {
        text-align: center;
        width: 100%;
        line-height: 1;
      }
    }
  }

  &-regist {
    &__card {
      flex: 1 1 auto;
      width: 100%;
      // padding: 4px 12px;
      display: flex;
      flex-flow: column nowrap;

      div.form-tip {
        background: rgba(#ccc, 0.7);
        line-height: 1.05rem;
        color: #8f00ff;
        padding: 4px;
      }

      span.tip-text {
        text-align: center;
        line-height: 1;
        font-size: 0.75rem;
        font-weight: 200;
      }
    }

    &__form {
      flex: 1 1 auto;
      padding: 6px 12px;
      padding-top: 24px;
    }

    &__action {
      text-align: center;
      padding: 6px 12px;
    }
  }
}
</style>

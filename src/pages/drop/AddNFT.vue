<template>
  <v-container>
    <v-row class="justify-center py-4">
      <h3>Create My Drop</h3>
    </v-row>
    <v-row class="justify-center py-4">
      <v-col md="11" sm="12">
        <v-card class="px-4 py-4">
          <v-card-title class="meta-drop-card-title">
            <div class="meta-toggle-wrap">
              <v-btn-toggle :value="filterType" mandatory>
                <v-btn @click="setDropFilterTypeHandler(1)">whitelist drop</v-btn>
                <v-btn @click="setDropFilterTypeHandler(2)">Credentails</v-btn>
              </v-btn-toggle>
            </div>
            <WhiteListSteper ref="whiteListStepComp" />
            <div class="meta-step-wrap"></div>
          </v-card-title>

          <v-form ref="form" class="px-2" name="nftForm">
            <v-col cols="12" md="8" sm="12">
              <v-text-field
                v-model="projName"
                name="projName"
                :rules="rules.nameRules"
                label="Project Name"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <v-text-field
                v-model="projUrl"
                name="projUrl"
                label="Project Official Site"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <v-text-field
                v-model="projLogo"
                name="projLogo"
                label="Project Logo Url"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <v-textarea v-model="projIntro" solo name="input-7-4" label="Project Intro" outlined></v-textarea>
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <v-switch v-model="rules.rule" color="primary" label="Verify Twitter Account" value="Twitter"></v-switch>
              <v-switch v-model="rules.rule" color="primary" label="Verify Discord Account" value="Discord"></v-switch>
            </v-col>
            <v-col cols="12" md="8" sm="12"
              ><v-switch v-model="rules.skill" :label="`Skill Upgrade: ${rules.skill.toString()}`"></v-switch>
            </v-col>

            <!-- 设置过期时间 -->
            <v-col cols="12" md="8" sm="12">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="expiresDate" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
              <p>
                Expires Date: <strong>{{ expiresDate }}</strong>
              </p>
            </v-col>

            <v-divider></v-divider>
            <!-- Swtich NFT Contract -->
            <v-row v-if="filterType === 1" key="uploadAddressInputRow" align="center" class="d-flex mt-2">
              <v-col cols="12" md="8" sm="12">
                <v-file-input
                  ref="whitelistFileInput"
                  dense
                  accept="text/plain"
                  label="Upload address whitelist file"
                  name="whitelistFile"
                  :value="whitelistFile"
                  outlined
                  :disabled="!selectedAddress"
                  @change="whiteFileChangeHandler"
                >
                  <template #append-outer>
                    <div class="meta-file-appender">
                      <!-- <v-btn text plain outlined small class="me-2" @click="uploadFileHandler">Upload</v-btn> -->
                      <v-btn
                        tag="a"
                        text
                        plain
                        color="primary"
                        class="ms-2"
                        href="/whitelist_template.txt"
                        download
                        small
                        >Template download</v-btn
                      >
                      <!-- <span>{{ selectedAddress }}</span> -->
                    </div>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
            <v-col v-if="filterType !== 1" key="useMetaRuleCol" class="meta-rule-wrap" cols="12" md="8" sm="12">
              <v-select
                v-model="select"
                :items="credentialsSelect"
                single-line
                label="Select address filter rule"
                return-object
                outlined
              ></v-select>
              <div class="meta-rule-btn px-2">
                <v-btn v-if="!loadingGetMerkleRoot" text color="orange" @click="addCustomRule(select)"
                  >add custom rule</v-btn
                >
                <v-progress-circular v-if="loadingGetMerkleRoot" indeterminate color="primary"></v-progress-circular>
              </div>
            </v-col>
            <v-col cols="12" md="8" sm="12" class="">
              <span>Merkel Root: </span><span>{{ merkleRoot }}</span>
            </v-col>

            <v-col cols="12" md="12">
              <v-radio-group mandatory row disabled hint="Swtich NFT Contract">
                <v-radio label="Use metadrop NFT contract mint" value="1" @click="() => (useMetaSc = 1)"></v-radio>
                <v-radio label="Use my NFT contract mint" value="2" @click="() => (useMetaSc = 2)"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <v-text-field
                v-model="nftname"
                name="nftname"
                hint="Entry your NFT name"
                label="NFT name"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <v-text-field
                v-model="image"
                name="image"
                hint="image Url"
                label="NFT Image URI"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <v-textarea v-model="nftDescription" solo name="input-7-4" label="NFT Description" outlined></v-textarea>
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <v-text-field
                v-model="dropAmount"
                name="dropAmount"
                hint="Entry an number of drop amount"
                label="Drop amount"
                type="number"
                required
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col v-if="showUseMetaSc" key="useMetaBaseUrl" cols="12" md="8" sm="12">
              <v-text-field
                name="nftBaseUrl"
                :value="nftBaseUrl"
                hint=""
                label="NFT baseURI"
                required
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col v-if="!showUseMetaSc" key="useCustNFTSCAddress" cols="8" md="8" sm="12">
              <v-text-field
                name="custNFTAddress"
                :value="nftScAddress"
                hint="Your NFT Contract must Implement mint to address method"
                label="NFT Contract Address"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col v-if="!showUseMetaSc" key="useCustNFTSCPrePay" cols="8" md="8">
              <v-text-field
                name="custNFTPrePay"
                :value="nftScAddress"
                hint="PrePay Metadrop mint Gas fee
              (5usdt/100NFT)"
                label="PrePay Metadrop mint Gas fee"
                required
                outlined
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-sheet>
                <v-switch
                  :value="opensea"
                  :label="`Add opeasea traits protocol [${opensea ? 'Y' : 'N'}] `"
                  :true-value="true"
                  :input-value="true"
                  :false-value="false"
                  @change="onOpenseaChangeHandler"
                ></v-switch>
              </v-sheet>
            </v-col>
          </v-form>
          <v-form ref="TraitsForm">
            <v-list v-if="!!opensea" key="openseaList">
              <v-list-item v-for="(t, idx) in traits" :key="'traits_' + idx" three-line>
                <v-list-item-avatar width="60">
                  <v-progress-circular :value="t.value || 0" :color="getCircleColor(t.value)"></v-progress-circular>
                </v-list-item-avatar>
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      name="'traitsType_'+idx"
                      :value="t.trait_type"
                      hint="trait_type in opensea require an string"
                      label="trait_type"
                      required
                      outlined
                      @input="(v) => traitInputHandler(idx, v, 'trait_type')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      name="nftBaseUrl"
                      :value="t.value"
                      hint="an number 0~100 or a percent decimals"
                      label="trait value"
                      required
                      outlined
                      type="number"
                      @input="(v) => traitInputHandler(idx, v, 'value')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      name="nftBaseUrl"
                      :value="t.display_type"
                      hint="the trait type display in opensea"
                      label="display type"
                      required
                      outlined
                      @input="(v) => traitInputHandler(idx, v, 'display_type')"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-list-item-action class="meta-attrs-action" style="min-width: 80px">
                  <v-btn :key="'plusbtn_' + idx" icon @click="addTraitState"><v-icon>mdi-plus</v-icon></v-btn>
                  <v-btn v-if="idx !== 0" :key="'minusbtn_' + idx" icon @click="delTraitState(idx)">
                    <v-icon>mdi-minus</v-icon></v-btn
                  >
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-form>

          <!-- Btn -->
          <v-card-actions class="meta-actions-wrap">
            <v-row key="whitleBtns" class="justiy-center">
              <v-col cols="12" class="px-2"
                ><v-btn
                  color="orange"
                  block
                  text
                  :outlined="!selectedAddress || loading"
                  :disabled="!selectedAddress || loading"
                  @click="submitDropHandler"
                  >Submit</v-btn
                ></v-col
              >
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WhiteListSteper from './WhiteListSteper.vue'
import { getMetaDropNftBaseUri } from '@lib/env/safe-env.js'
import { mapState, mapGetters } from 'vuex'
import { validFormData } from './add-nft'
import { getWeb3js } from '@lib/web3'
import { signCreateDrops } from '@lib/web3/sign-util'
import { METAMASK_DOWNLOAD_URL } from '@lib/metamask/constants'

export default {
  name: 'AddNFTDrop',
  components: { WhiteListSteper },
  data() {
    return {
      ts: '',
      merkleRoot: '',
      filterType: 1,
      projName: '',
      projUrl: '',
      projIntro: '',
      projLogo: '',
      whiteStepVal: 1,
      customStepVal: 2,
      whitelistFile: null,
      dropAmount: 0,
      opensea: true,
      useMetaSc: 1,
      nftScAddress: '',
      nftname: '',
      image: '',
      nftDescription: '',
      rules: {
        nameRules: [(v) => !!v || 'Name is required'],
        addrFileRules: [],
        skill: false,
        credentials: [],
        rule: [],
      },
      select: null,
      nftBaseUrl: '',
      traits: [{ trait_type: '', value: 10, display_type: '' }],
      loading: false,
      expiresDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      dateFormatted: this.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
      ),
      menu1: false,
      merkleTreeKey: null,
      loadingGetMerkleRoot: false,
    }
  },
  computed: {
    ...mapState('wal', ['selectedAddress', 'walletConnected', 'shortAddress', 'hasUserRegist', 'userInfo']),
    ...mapGetters('sol', ['nftBaseUri']),
    ...mapGetters('biz', ['credentialsSelect', 'skillsSelect']),
    ...mapGetters('web3', ['metamaskInjected', 'envChecking']),
    ...mapGetters(['getConnectBtn']),
    dyncTraits() {
      return this.traits
    },
    showUseMetaSc() {
      return this.useMetaSc === 1
    },
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    nftBaseUri(n, old) {
      if (n) {
        this.nftBaseUrl = n
      }
    },
    expiresDate(val) {
      this.dateFormatted = this.formatDate(this.expiresDate)
    },
  },
  mounted() {
    const baseUri = getMetaDropNftBaseUri()
    this.nftBaseUrl = this.nftBaseUri || baseUri
    this.filterType = 1
    this.getCredentialSelectList()
    this.getSkillsList()
  },
  methods: {
    async getCredentialSelectList() {
      try {
        await this.$store.dispatch('biz/getDropCredentialsSelectList')
      } catch (ex) {
        this.$toast(ex.message, 'fail', 6000)
      }
    },
    async getSkillsList() {
      try {
        await this.$store.dispatch('biz/getDropSkillsSelectList')
      } catch (ex) {
        this.$toast(ex.message, 'fail', 6000)
      }
    },
    getCircleColor(v) {
      if (!v) return ''
      if (v > 0 && v < 30) return 'blue-grey'
      if (v >= 30 && v < 50) return 'brown'
      if (v >= 50 && v < 80) return 'deep-orange lighten-2'
      if (v >= 80) return 'red accent-2'
    },
    setDropFilterTypeHandler(typ) {
      this.merkleRoot = null
      this.dropAmount = 0
      this.filterType = typ
    },
    async whiteFileChangeHandler(file) {
      const metaSteper = this.$refs.whiteListStepComp
      if (!file) {
        this.merkleRoot = ''
        this.dropAmount = 0
        if (typeof metaSteper.setStepValue === 'function') {
          metaSteper.setStepValue(1)
        }
      } else if (file && this.selectedAddress) {
        const vm = this
        const currAddress = this.selectedAddress

        try {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('selectedAddress', currAddress)
          const resp = await vm.$api('storage.upload', formData)
          const { code, msg, data } = resp
          console.log('>>>>>Upload>>>>>>>>>>', code, resp)
          if (code !== 0) {
            vm.$toast(msg || 'upload fail', 'fail', 6000)
            return
          } else {
            const { merkleRoot, airdropsAddressCount } = data
            vm.setUploadResult(merkleRoot, airdropsAddressCount)

            if (typeof metaSteper.setStepValue === 'function') {
              metaSteper.setStepValue(2)
            }
          }
        } catch (ex) {
          console.log('>>>>>>>>>>>>>>>>>>>>>>', ex)
        }
      }

      this.whitelistFile = file || null
    },
    // click handler
    async uploadFileHandler() {
      const vm = this
      try {
        const file = this.whitelistFile
        const currAddress = this.selectedAddress

        if (!file) throw new Error('Please select a whitelist file.')
        if (!currAddress) throw new Error('MetaMask unconnected.')
        const formData = new FormData()
        formData.append('file', file)
        formData.append('selectedAddress', currAddress)
        const resp = await vm.$api('storage.upload', formData)
        const { code, msg, data } = resp.data

        if (code !== 0) {
          vm.$toast(msg || 'upload fail', 'fail', 6000)
          return
        } else {
          const { merkleRoot, airdropsAddressCount } = data
          vm.setUploadResult(merkleRoot, airdropsAddressCount)
        }
      } catch (ex) {
        this.$toast(ex.message, 'fail', 6000)
      }
    },
    setUploadResult(merkleRoot, amout) {
      this.merkleRoot = merkleRoot
      this.dropAmount = amout
    },
    //空投项目验签
    async signOpts(merkleRoot) {
      if (!merkleRoot) {
        this.$toast('CreateDrops merkleRoot required', 'warn', 3000)
        return
      }
      try {
        const opts = {
          selectedAddress: this.selectedAddress,
          merkleRoot: merkleRoot,
        }
        const web3js = await getWeb3js()
        return await signCreateDrops(web3js, opts)
      } catch (ex) {
        console.log('Regist>>>>>>>>>ex>>>>>>>>', ex)
        this.$toast(`Signed fail.${ex.message}`, 'fail', 8000)
      }
    },
    // Submit
    async submitDropHandler() {
      try {
        this.loading = true
        const submitData = validFormData(this)
        const scb = this.gobackHome.bind(this)
        const sign = await this.signOpts(submitData.merkleRoot)
        submitData.address = this.selectedAddress
        submitData.signedData = sign

        const resp = await this.$api('drop.create_nft', submitData)
        const { code, msg, data } = resp
        console.log('signOpts>>>>>>>>>ex>>>>>>>>', submitData, code)
        if (code !== 0 || !data || !data.length) {
          throw new Error(msg || 'Create Drop Fial')
        } else {
          this.$toast('Create Drop Success', 'success', 3000, scb)
          this.gobackHome()
        }
      } catch (ex) {
        this.loading = false
        this.$toast(ex.message, 'fail', 6000)
      }
    },
    gobackHome() {
      this.loading = false
      this.$router.push('/')
    },
    nextStepHandler(typ) {
      if (typ === 1) {
        if (this.whiteStepVal <= 4) {
          this.whiteStepVal = this.whiteStepVal + 1
        } else {
          this.whiteStepVal = 4
        }
      } else {
        if (this.customStepVal <= 3) {
          this.customStepVal = 1
        } else {
          this.customStepVal = this.customStepVal + 1
        }
      }
    },

    prevStepHandler(typ) {
      if (typ === 1) {
        if (this.whiteStepVal > 1) {
          this.whiteStepVal = this.whiteStepVal - 1
        } else {
          this.whiteStepVal = 1
        }
      } else {
        if (this.customStepVal > 1) {
          this.customStepVal -= 1
        } else {
          this.customStepVal = 1
        }
      }
    },

    addTraitState() {
      const t = { trait_type: '', value: 10, display_type: '' }
      this.traits.push(t)
    },
    delTraitState(idx) {
      this.traits.splice(idx, 1)
    },
    traitInputHandler(idx, v, key) {
      let old = this.traits[idx]
      const n = Object.assign({}, old, { [key]: v })
      this.traits.splice(idx, 1, n)
    },
    onUseMetaScHandler(v) {
      this.useMetaSc = v
    },
    onOpenseaChangeHandler(v) {
      this.opensea = Boolean(v)
    },
    async addCustomRule(selectObj) {
      console.log(selectObj)
      const vm = this
      vm.loadingGetMerkleRoot = true
      try {
        if (!selectObj) throw new Error('Please select a credentials.')
        // 定时查询merkleRoot返回结果
        this.interval = setInterval(async () => {
          const resp = await vm.$api('drop.credentialsAddressMerkleTree', {
            ids: selectObj.value,
            merkleTreeKey: vm.merkleTreeKey,
          })
          const { code, msg, data, merkleTreeKey } = resp
          vm.merkleTreeKey = merkleTreeKey
          if (code !== 0) {
            console.log(msg, 'server error')
            vm.$toast(msg || 'server error', 'fail', 6000)
          } else if (merkleTreeKey && !data) {
            console.log(msg, 'server is running ...')
            vm.$toast('server is running ...', 'warning', 6000)
          } else {
            const { merkleRoot, airdropsAddressCount } = data
            vm.setUploadResult(merkleRoot, airdropsAddressCount)
            this.rules.credentials = []
            this.rules.credentials.push(selectObj.value)
            vm.loadingGetMerkleRoot = false
            clearInterval(this.interval)
          }
        }, 10000)
      } catch (ex) {
        vm.loadingGetMerkleRoot = false
        this.$toast(ex.message, 'fail', 6000)
      }
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>
<style lang="scss" scoped>
.meta {
  &-toggle {
    &-wrap {
      flex: 1 1 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  &-step {
    &-wrap {
      width: 100%;
    }
  }

  &-actions {
    &-wrap {
      width: 100%;
    }
  }

  &-rule {
    &-wrap {
      display: flex;
      flex-flow: row;
      align-items: center;
    }
  }

  &-attrs {
    &-action {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-items: center;
    }
  }

  &-file {
    &-appender {
      display: flex;
      flex: 1 1 auto;
      flex-flow: row;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  &-drop {
    &-card-title {
      flex: 1 1 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
}
</style>

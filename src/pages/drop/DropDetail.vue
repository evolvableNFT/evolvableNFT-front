<template>
  <v-container>
    <v-card class="meta-nftcard" elevation="0" outlined>
      <v-card-title>
        <span v-if="d.logoUri" key="drop_logo">
          <v-avatar><v-img :src="d.logoUri"></v-img></v-avatar>
        </span>
        <span class="title pl-2">{{ d.name }}</span>
      </v-card-title>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-over-line">
            <span>{{ d.nftInfo ? d.nftInfo.name : '' }}</span> <span class="drop-total">[{{ d.dropTotal }}]</span>
          </div>
          <v-list-item-title> </v-list-item-title>
          <v-list-item-subtitle>
            {{ d.nftInfo ? d.nftInfo.description : '' }}
          </v-list-item-subtitle>
          <v-list-item-subtitle v-if="d.expiresDate"> End Date: {{ d.expiresDate }} </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar v-if="d.nftInfo && d.nftInfo.image" key="'img_' + id" size="120" tile color="grey">
          <v-img :src="d.nftInfo.image"></v-img>
        </v-list-item-avatar>
        <v-list-item-avatar v-else key="'_spanImg_' + id" size="80" tile color="grey">
          {{
            d.nftInfo && d.nftInfo.name ? (d.nftInfo.name.length > 3 ? d.nftInfo.name.slice(0, 3) : d.nftInfo.name) : ''
          }}
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item key="drop-credentails" class="meta-drop-credentails">
        <v-chip link outlined pill color="teal"
          >{{ currentAddress ? userInfo.email || '' : 'Wallet unconnected' }}
          <v-icon class="ps-2">mdi-email</v-icon>
        </v-chip>
        <v-chip link outlined pill :color="d.twitterRule ? 'indigo darken-3' : disableChipColor" class="ms-4"
          >{{ userInfo.twitter || '' }}
          <v-icon class="ps-2">mdi-twitter</v-icon>
        </v-chip>
        <v-chip link outlined pill :color="d.discordRule ? 'deep-purple accent-4' : disableChipColor" class="ms-4"
          >{{ userInfo.discord || '' }}
          <v-icon class="ps-2">mdi-discord</v-icon>
        </v-chip>
      </v-list-item>

      <v-card-actions>
        <v-btn rounded outlined small text class="px-6" :disabled="!canClaim" @click="claimHandler">Claim</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { getAllowWeb3js } from '@lib/web3'
import { claimNFT, isClainNFT } from '@biz/abi/drop-nft-sdk'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'DropDetail',
  components: {},
  data: () => ({
    disableChipColor: 'grey lighten-1',
    id: '',
    claimParam: {},
    nftTokenId: null,
    nftClaimed: false,
  }),
  computed: {
    ...mapState('wal', ['chainId', 'userInfo']),
    ...mapGetters('biz', ['dropItems']),
    ...mapGetters('wal', ['currentAddress']),
    d() {
      const dropid = this.id
      const detail = (this.dropItems || []).find((it) => it.dropid === dropid || it.dropid === parseInt(dropid))
      return detail || {}
    },
    canClaim() {
      const _address = !!this.userInfo.address
      const _twitter = !!this.userInfo.twitter
      const _discord = !!this.userInfo.discord
      const _email = !!this.userInfo.email
      const ret = _address && _email
      if (this.d.twitterRule) {
        ret = _address && _twitter
      }
      if (this.d.discordRule) {
        ret = _address && _discord
      }
      console.log('this.nftClaimed', this.nftClaimed, ret)
      if (this.nftClaimed) {
        return false
      }
      // console.log(_address, _twitter, _discord, _email, ret, this.d)
      return ret
    },
  },
  mounted() {
    const dropid = this.$route.params.id
    const address = this.$store.state.wal.selectedAddress

    this.id = dropid

    if (address && dropid) {
      this.$api('drop.getClaimParams', { dropId: dropid, address })
        .then((resp) => {
          const { code, msg, data } = resp
          if (code === 0 && data && typeof data === 'object') {
            this.claimParam = data
            this.nftTokenId = data.tokenId
            console.log(this.nftTokenId, 'this.nftTokenId')

            this.hasClaimNFT()
          } else {
            this.nftClaimed = true
          }
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  },
  methods: {
    async hasClaimNFT() {
      const { chainId, selectedAddress } = this.$store.state.wal || {}
      if (!chainId || !selectedAddress) throw new Error('Please connect wallet')
      console.log(chainId, selectedAddress, 'chainId')
      const web3js = getAllowWeb3js()
      this.nftClaimed = await isClainNFT(web3js, chainId, this.nftTokenId, selectedAddress)
    },
    async claimHandler() {
      const vm = this
      try {
        const dropId = this.id
        const { chainId, selectedAddress } = this.$store.state.wal || {}
        // console.log(chainId,"chainId")
        if (!chainId || !selectedAddress) throw new Error('Please connect wallet')

        if (!dropId) throw new Error('Miss dropid or address')

        const claimResp = await this.$api('drop.getClaimParams', { dropId, address: selectedAddress })

        const { code, msg, data } = claimResp

        if (code !== 0 || typeof data !== 'object' || !data) {
          throw new Error(msg === 'ok' ? 'Not found your address in this drop' : msg)
        }
        const web3js = getAllowWeb3js()

        vm.nftTokenId = data.tokenId
        const receipt = await claimNFT(web3js, {
          selectedAddress: selectedAddress,
          dropid: dropId,
          tokenId: data.tokenId,
          proof: data.proof,
          chainId,
        })
        console.log('receipt>>', receipt)
        vm.$toast(`Claim submit success,please blockchain confirm ${receipt.hash}`, 'success', 4000)
      } catch (ex) {
        let msg = ex.message
        console.log('ex', ex.message)

        try {
          let _emsg = ex.message
          let regex = 'Internal JSON-RPC error.'
          if (_emsg.startsWith(regex)) {
            let jsonStr = _emsg.slice(regex.length).trim()
            const errData = JSON.parse(jsonStr)
            msg = errData.message || ex.message
          }
        } catch (_) {}

        vm.$toast(msg, 'fail', 10000)
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>

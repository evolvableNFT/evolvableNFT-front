<template>
  <v-container>
    <v-toolbar dense elevation="0">
      <v-toolbar-title>My NFTs</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col v-for="(card, idx) in nfts" :key="idx + '_' + card.title" :cols="cardCols">
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon @click="taskUpgrade()">
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import api from '@/biz/api'
import { getAllowWeb3js } from '@lib/web3'
import { claimNFT, isClainNFT } from '@biz/abi/drop-nft-sdk'
export default {
  name: 'UserNftList',
  components: {},
  data: () => ({
    cards: [
      // { title: 'HongKondg', src: 'https://s1.ax1x.com/2022/03/22/qKTyB8.png', flex: 4 },
      // {
      //   title: 'TEst Deops',
      //   src: 'https://gateway.pinata.cloud/ipfs/QmPTq4aSfUpogxfipi1w5s8ekVT6EqwmPL3KpAu5p42g9t/1.png',
      //   flex: 4,
      // },
      // { title: 'HongKondgGGG', src: 'https://s1.ax1x.com/2022/03/22/qKTyB8.png', flex: 4 },
      // { title: 'Best airlines', src: 'https://s1.ax1x.com/2022/03/22/qKTRhj.png', flex: 4 },
      // { title: 'MobkeyTest', src: 'https://s4.ax1x.com/2022/02/22/bpVpGQ.png' },
    ],
    nfts: [],
  }),
  computed: {
    cardCols() {
      let cols = 4
      const bke = this.$vuetify.breakpoint.name
      switch (bke) {
        case 'xs':
          return 12
        case 'sm':
          return 6
        case 'md':
        case 'lg':
        case 'xl':
          return 2
        default:
          return cols
      }
    },
    ...mapGetters('wal', ['currentAddress', 'chainId', 'userInfo']),
    ...mapGetters('nfts', ['nftsItems']),
  },
  mounted() {
    this.nfts = []
    this.nftlist()
  },
  methods: {
    async nftlist() {
      try {
        await this.$store.dispatch('nfts/loadNFTsList', this.currentAddress)
        for (var item of this.nftsItems) {
          let data = await api('drop.metadatastructure', { tokenId: item.tokenId, contract: item.contract })
          console.log('drop.metadatastructure', item.tokenId, item.contract, data)
          if (data && data.name) {
            this.nfts.push({ src: data.image, title: data.name, metadata: data })
          } else {
            this.nfts.push(item)
          }
        }
      } catch (ex) {
        this.$toast(ex.message, 'fail', 6000)
      }
    },
    async taskUpgrade() {
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

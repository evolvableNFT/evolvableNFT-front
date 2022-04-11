<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="60%">
      <v-card-title>{{ credentials.title }}</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-avatar size="24">
            <img :src="credentials.avatarUrl" alt="avatar" />
          </v-avatar>
          <div class="grey--text ms-4">{{ credentials.chainInfo }}</div>
        </v-row>

        <div class="my-4 text-subtitle-1">{{ credentials.createdBy }}</div>
        <div>{{ credentials.desc }}</div>
        <div class="my-4 text-subtitle-1">{{ credentials.type }}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <v-alert text>
          <h3>Endpoint</h3>
          <div class="grey--text ms-4">{{ credentials.graphLink }}</div>
        </v-alert>
        <v-alert text>
          <h3>Query</h3>
          <div class="grey--text ms-4">{{ credentials.query }}</div>
        </v-alert>
        <v-alert text>
          <h3>Expression</h3>
          <div class="grey--text ms-4">{{ credentials.expression }}</div>
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'CredentialsDetail',
  components: {},
  data: () => ({
    id: '',
  }),
  computed: {
    ...mapGetters('biz', ['credentialsItems']),
    credentials() {
      const id = this.id
      const detail = (this.credentialsItems || []).find((it) => it.id === id || it.id === parseInt(id))
      return detail || {}
    },
  },
  mounted() {
    this.id = this.$route.params.id
  },
  methods: {
    // {
    //   title: 'Uniswap V2 Liquidity Provider ',
    //   avatarUrl: 'https://s1.ax1x.com/2022/03/25/qNfJyQ.png',
    //   desc: 'Any address that provided liquidity to a pool on Uniswap V2 on Ethereum mainnet',
    //   createdBy: '0xcFc...fC8',
    //   type: 'subgraph',
    //   chainInfo: 'Ethereum',
    //   graphLink: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    // },
  },
}
</script>
<style lang="scss" scoped></style>

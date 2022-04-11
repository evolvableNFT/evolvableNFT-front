<template>
  <v-container>
    <v-toolbar dense elevation="0">
      <v-toolbar-title>Credentails</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-col v-for="(card, idx) in credentialsItems" :key="idx + '_' + card.title" :cols="cardCols">
          <v-hover v-slot="{ hover }" open-delay="10">
            <v-card
              outlined
              class="meta-credentail"
              :elevation="hover ? 20 : 2"
              :class="{ 'on-hover': hover }"
              @click="credentialDetailHandler(card.id)"
            >
              <v-card-title class="d-flex">
                <v-avatar v-if="card.avatarUrl || card.icon" size="24">
                  <v-icon v-if="card.icon">{{ card.icon }}</v-icon>
                  <img v-else :src="card.avatarUrl" alt="avatar" />
                </v-avatar>
                <div>
                  <span :class="card.avatarUrl || card.icon ? 'ps-2' : ''">{{ card.title }}</span>
                </div>
              </v-card-title>
              <v-img class="align-start px-4" height="150px">
                <p class="meta-credentail-desc">
                  {{ card.desc }}
                </p>
              </v-img>
              <v-card-text>
                <p class="meta-credentail-desc pt-2">{{ card.type }}</p>
                <p class="meta-credentail-desc pt-2">{{ card.chainInfo }}</p>
              </v-card-text>

              <v-card-actions>
                <span>{{ card.createdBy }}</span>
                <v-spacer></v-spacer>
                <v-btn v-if="card.githubLink" key="githubBtn" icon @click="openLink(card.githubLink, 'github')">
                  <v-icon>mdi-github</v-icon>
                </v-btn>
                <v-btn v-if="card.graphLink" key="subgraph" icon @click="openLink(card.graphLink, 'Thegraph')">
                  <v-icon size="20">mdi-graph-outline</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
// import { dropSvg } from '@assets/drop.svg'
import { mapGetters } from 'vuex'

export default {
  name: 'CredentialsList',
  components: {},
  data: () => ({
    cards: [],
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
          return 3
        default:
          return cols
      }
    },
    ...mapGetters('biz', ['credentialsItems']),
  },
  mounted() {
    this.getCredentialList()
  },
  methods: {
    openLink(url, target = '_blank') {
      window.open(url, target)
    },
    async getCredentialList() {
      try {
        await this.$store.dispatch('biz/loadCredentialsList')
      } catch (ex) {
        this.$toast(ex.message, 'fail', 6000)
      }
    },
    credentialDetailHandler(id) {
      this.$router.push({ path: `/rule/credentails/${id}` })
    },
  },
}
</script>
<style lang="scss" scoped>
.meta {
  &-credentail {
    background: linear-gradient(26deg, #ffffff 0%, #f9faff 100%);

    p {
      font-size: 14px;
      font-weight: normal;
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    }
  }
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.9;
}
.v-card .on-hover .theme--dark {
  background-color: rgba(#fff, 0.8);
}
</style>

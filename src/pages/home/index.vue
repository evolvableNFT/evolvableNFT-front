<template>
  <v-container>
    <v-row>
      <v-col class="meta-cards-wrap" cols="12" md="10" sm="12">
        <v-row>
          <v-col v-for="(item, idx) in dropItems" :key="idx" cols="12" class="m-col">
            <v-card class="meta-drop-card" elevation="0" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline">
                    <span>{{ item.name }}</span>
                  </div>
                  <v-list-item-title> </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.description || '' }}
                  </v-list-item-subtitle>
                  <div class="token-wrap">
                    <span class="m-drop-label"> Total Drop </span>
                    <span class="m-drop-total">{{ item.dropTotal }}</span>
                  </div>
                </v-list-item-content>
                <v-list-item-avatar v-if="item.logoUri" :key="'img_' + idx" size="80" tile color="grey">
                  <v-img :src="item.logoUri"></v-img>
                </v-list-item-avatar>
                <v-list-item-avatar v-if="!item.logoUri" :key="'_spanImg' + idx" size="80" tile color="grey">
                  {{ item.name.length > 3 ? item.name.slice(0, 3) : item.name }}
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  :disabled="!currentAddress"
                  rounded
                  outlined
                  small
                  text
                  class="px-6"
                  @click="dropDetailHandler(item.dropid)"
                  >Detail</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  components: {},
  data() {
    return {
      activedDrops: [],
    }
  },
  computed: {
    ...mapGetters('wal', ['currentAddress']),
    ...mapGetters('biz', ['dropItems']),
  },
  mounted() {
    this.getDroplist()
  },
  methods: {
    async getDroplist() {
      try {
        await this.$store.dispatch('biz/loadDropList')
      } catch (ex) {
        this.$toast(ex.message, 'fail', 6000)
      }
    },
    dropDetailHandler(id) {
      this.$router.push({ path: `/drop_detail/${id}` })
    },
  },
}
</script>
<style lang="scss" scoped>
.m-col {
  flex: 0 0 33.33333%;
  div.meta-drop-card {
    height: 175px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }

  span.m-symbol {
    margin-left: 0.25em;
    font-size: 0.85em;
  }

  .token-wrap {
    span {
      font-size: 0.85rem;
    }
  }
}

@media only screen and (max-width: 600px) {
  .m-col {
    flex: 0 0 100%;
    div.meta-drop-card {
      height: 175px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
    }
  }
}
</style>

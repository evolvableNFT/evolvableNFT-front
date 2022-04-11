<template>
  <v-menu
    v-if="!!selectedAddress"
    ref="metaNotificationDrop"
    v-model="opened"
    content-class="meta-belldrop"
    :close-on-content-click="false"
    width="70"
    open-delay="200"
    offset-y
    bottom
    right
    absoluteorigin="center center"
    transition="scale-transition"
    nudge-bottom="20"
    nudge-right="-240"
  >
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" plain :ripple="false" :class="className" v-on="on">
        <v-badge color="green" overlap dot>
          <v-img :src="bellSvg" :width="bellSize" :height="bellSize"></v-img>
        </v-badge>
      </v-btn>
    </template>
    <v-sheet class="mx-2" width="260">
      <div class="meta-inner-close">
        <div class="meta-notifi-head">
          <span class="text">Latest notification</span>
        </div>
        <v-icon @click="closeWalletModal">mdi-close</v-icon>
      </div>
      <v-list class="meta-notifi-list" two-line>
        <v-list-item v-for="(it, idx) in unreadMessages" :key="idx" dense>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>mdi-water-outline</v-icon>
              <span>{{ it.title }}</span>
            </v-list-item-title>
            <v-list-item-subtitle>{{ it.message }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import bellSvg from '@assets/bell.svg'
export default {
  name: 'NotificationBell',
  components: {},
  props: {
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      opened: false,
      bellSize: 28,
      bellSvg,
      unreadMessages: [{ message: 'More functions,will come soon', title: 'Metadrop' }],
    }
  },
  computed: {
    unreadNum: () => (this.unreadMessages ? this.unreadMessages.length : 0),
    ...mapState('wal', ['selectedAddress']),
  },
  methods: {
    closeWalletModal() {
      this.opened = false
    },
  },
}
</script>
<style lang="scss" scoped>
.meta {
  &-belldrop {
    border-radius: 16px;
    background: #fff;

    & div.meta-inner-close {
      width: 100%;
      flex: 1 1 100%;
      padding: 6px 0;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }

    & > div.meta-inner-wrap {
      flex: 1 1 100%;
      // padding: 6px 0px;
    }
  }

  &-notifi {
    &-head {
      span.text {
        font-weight: 500;
      }
    }
    &-list {
      padding-top: 2px;
      .v-list-item {
        padding: 0px 0px;
      }
    }
  }

  &-bell {
    &-container {
      padding: 0 12px;

      & > div.inner-box {
        position: fixed;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;
        width: 48px;
        height: 48px;
        border: 1px solid #fce088;

        & > div.notification-dot {
          width: 16px;
          height: 16px;
          border-radius: 16px;
          background: green;
          float: right;
          top: 2px;
        }
      }
    }
  }
}
</style>

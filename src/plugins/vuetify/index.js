import Vue from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify, { VLayout } from 'vuetify/lib'
// import preset from './preset'

Vue.use(Vuetify, {
  components: { VLayout },
})

const vuetifyInst = new Vuetify({
  // preset,
  icons: {
    iconfont: 'mdi', // 默认值 - 仅用于展示目的
  },
  theme: {
    themes: {
      light: {
        primary: '#3772ff',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
})

vuetifyInst.cls = 'd-none d-md-flex d-lg-none'
export default vuetifyInst

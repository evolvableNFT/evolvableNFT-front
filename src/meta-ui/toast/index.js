import vue from 'vue'

import MetaToast from './MetaToast.vue'

const ToastConstructor = vue.extend(MetaToast)

function showToast(message, type = 'normal', duration = 5000, cb) {
  function _cb() {}
  const _toast = new ToastConstructor({
    data() {
      return {
        showToast: true,
        type: type,
        message: message,
        duration: duration,
        cb: typeof cb === 'function' ? cb : _cb,
      }
    },
  })

  let $vm = _toast.$mount().$el
  document.body.appendChild($vm)

  setTimeout(() => {
    typeof cb === 'function' && cb()
    _toast.showToast = false
  }, duration)
}

showToast.install = (Vue) => {
  Vue.prototype.$toast = showToast
}

export default showToast

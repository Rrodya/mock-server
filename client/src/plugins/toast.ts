import ToastContainer from '@/components/Toaster/ToastContainer.vue'
import { createApp } from 'vue'

let toastContainerInstance = null

export default {
  install(app) {
    const ToastPlugin = {
      install(Vue) {
        if (!toastContainerInstance) {
          const container = document.createElement('div')
          document.body.appendChild(container)

          const toastContainer = createApp(ToastContainer).mount(container)
          toastContainerInstance = toastContainer
        }

        const toast = {
          success: (message, timeout = 5000) =>
            toastContainerInstance.addToast(message, 'success', timeout),
          error: (message, timeout = 5000) =>
            toastContainerInstance.addToast(message, 'error', timeout),
          info: (message, timeout = 5000) =>
            toastContainerInstance.addToast(message, 'info', timeout),
          warning: (message, timeout = 5000) =>
            toastContainerInstance.addToast(message, 'warning', timeout),
        }

        app.provide('toast', toast) // Используем provide
      },
    }

    app.use(ToastPlugin)
  },
}

// components/ToastContainer.vue
<template>
  <transition-group name="fade" tag="div" class="toast-container">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      v-bind="toast"
      @dismiss="removeToast(toast.id)"
    />
  </transition-group>
</template>

<script>
import { ref } from 'vue'
import Toast from './Toast.vue'

export default {
  components: { Toast },
  setup() {
    const toasts = ref([])

    const addToast = (message, type = 'info', timeout = 5000) => {
      const id = Date.now().toString()
      toasts.value.push({ id, message, type })

      setTimeout(() => removeToast(id), timeout)
    }

    const removeToast = (id) => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }

    return { toasts, addToast, removeToast }
  },
}
</script>

<style>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

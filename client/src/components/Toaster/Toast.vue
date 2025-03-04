<template>
  <div
    :class="['toast', `toast-${type}`]"
    @click="dismiss"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    message: String,
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
    }
  },
  methods: {
    dismiss() {
      this.$emit('dismiss')
    }
  }
}
</script>

<style scoped>
.toast {
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.toast-success { background-color: green; }
.toast-error { background-color: red; }
.toast-info { background-color: blue; }
.toast-warning { background-color: orange; }
</style>

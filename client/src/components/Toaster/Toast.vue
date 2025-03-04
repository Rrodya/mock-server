<template>
  <div :class="['toast-cus', `toast-${type}`]" @click="dismiss">
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
      validator: (value) => ['success', 'error', 'info', 'warning'].includes(value),
    },
  },
  methods: {
    dismiss() {
      this.$emit('dismiss')
    },
  },
}
</script>

<style scoped>
.toast-cus {
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.toast-success {
  background-color: var(--color-accent);
}
.toast-error {
  background-color: var(--color-secondary);
}
.toast-info {
  background-color: var(--color-info);
}
.toast-warning {
  background-color: var(--color-warning);
}
</style>

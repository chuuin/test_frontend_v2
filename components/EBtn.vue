<template>
  <button :class="['e-btn', `e-btn-${color}`]">
    {{ text || '' }}
    <slot v-if="!text" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  color?: 'success' | 'error' | 'warn'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success'
})

const { text, color } = props
</script>

<style scoped lang="scss">
.e-btn {
  border: none;
  border-radius: 8px;
  padding: 0.6em 1.4em;
  font-size: 15px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 80%);
    transform: scale(0);
    transition: all 0.5s ease;
    border-radius: 50%;
  }

  &:hover::before {
    transform: scale(1);
  }

  &:active {
    transform: scale(0.96);
    box-shadow: 0 0 15px rgba(255,255,255,0.3) inset;
  }

  /* 顏色主題 */
  &-success {
    background: linear-gradient(45deg, #52c41a, #73d13d);
    &:hover { background: linear-gradient(45deg, #73d13d, #95de64); }
    &:active { background: linear-gradient(45deg, #389e0d, #52c41a); }
  }

  &-error {
    background: linear-gradient(45deg, #f5222d, #ff4d4f);
    &:hover { background: linear-gradient(45deg, #ff4d4f, #ff7875); }
    &:active { background: linear-gradient(45deg, #cf1322, #f5222d); }
  }

  &-warn {
    background: linear-gradient(45deg, #faad14, #ffc53d);
    &:hover { background: linear-gradient(45deg, #ffc53d, #ffe58f); }
    &:active { background: linear-gradient(45deg, #d48806, #faad14); }
  }

  /* 光暈效果 */
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 12px rgba(255,255,255,0.4);
  }
}
</style>

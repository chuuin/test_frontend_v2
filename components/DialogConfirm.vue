<!-- src/components/DialogConfirm.vue -->
<template>
  <dialog ref="d" class="custom-dialog">
    <form method="dialog">
      <h3>{{ title }}</h3>
      <p><slot>Are you sure?</slot></p>
      <menu>
        <button @click="onCancel">取消</button>
        <button @click="onConfirm">確認</button>
      </menu>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({ title: { type: String, default: '確認' } });
const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>();
const d = ref<HTMLDialogElement | null>(null);
function open() { d.value?.showModal(); }
function close() { d.value?.close(); }
function onConfirm(e: Event) { e.preventDefault(); emit('confirm'); close(); }
function onCancel(e: Event) { e.preventDefault(); emit('cancel'); close(); }
defineExpose({ open, close });
</script>

<style scoped>
.custom-dialog{ border-radius:12px; padding:1rem 1.2rem; width:min(92vw,420px); }
menu{ display:flex; justify-content:flex-end; gap:0.6rem; margin-top:1rem; }
</style>

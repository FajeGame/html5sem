<template>
  <div class="overlay">
    <div class="modal">
      <h3>{{ todo ? 'Редактировать' : 'Добавить' }}</h3>
      <input v-model="text" placeholder="Название задачи" />
      <div class="btns">
        <button @click="$emit('close')">Отмена</button>
        <button @click="save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ todo: Object })
const emit = defineEmits(['save', 'close'])
const text = ref('')
watch(
  () => props.todo,
  v => {
    text.value = v ? v.text : ''
  },
  { immediate: true }
)
function save() {
  if (!text.value.trim()) return
  emit('save', { text: text.value })
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
}
.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>

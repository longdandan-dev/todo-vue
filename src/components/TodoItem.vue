<script setup lang="ts">
import type { Todo } from '../data/todos'

interface Props {
  todo: Todo
  index: number
}
const props = defineProps<Props>()
interface Emits {
  toggle: [id: number]
  remove: [id: number]
}
const emit = defineEmits<Emits>()
</script>

<template>
  <li class="row" :class="{ done: props.todo.done }">
    <span class="row-index">{{ props.index + 1 }}</span>
    <span class="row-title">{{ props.todo.title }}</span>
    <span class="row-actions">
      <button class="btn-ghost" @click="emit('toggle', props.todo.id)">
        {{ props.todo.done ? '取消' : '勾选' }}
      </button>
      <button class="btn-ghost btn-danger" @click="emit('remove', props.todo.id)">删除</button>
    </span>
  </li>
</template>

<style scoped></style>

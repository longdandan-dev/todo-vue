<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { todos as todoData } from './data/todos'
import TodoItem from './components/TodoItem.vue'
import type { Todo } from './data/todos'

type Filter = 'all' | 'active' | 'done'
const filter = ref<Filter>('all')
const list = ref(todoData)
const draft = ref('')
const visibleList = computed(() => {
  if (filter.value === 'active') return list.value.filter((t) => !t.done)
  else if (filter.value === 'done') return list.value.filter((t) => t.done)
  else return list.value
})

function readStoredTodos(raw: string): Todo[] | null {
  try {
    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return null
    const ok = data.every(
      (t) =>
        typeof t?.id === 'number' && typeof t?.title === 'string' && typeof t?.done === 'boolean',
    )
    if (!ok) return null
    return data as Todo[]
  } catch {
    return null
  }
}
onMounted(() => {
  const raw = localStorage.getItem('todo-key')
  if (!raw) return
  const parsed = readStoredTodos(raw)
  if (parsed) list.value = parsed
})
onUnmounted(() => {
  console.log('组件死掉了')
})
watch(
  list,
  () => {
    localStorage.setItem('todo-key', JSON.stringify(list.value))
  },
  { deep: true },
)

function toggle(id: number) {
  const target = list.value.find((item) => item.id == id)
  if (!target) return
  target.done = !target.done
}

function remove(id: number) {
  list.value = list.value.filter((item) => item.id !== id)
}

function addTodo() {
  const titles = draft.value
  list.value.push({ id: Date.now(), title: titles, done: false })
  draft.value = ''
}
</script>

<template>
  <h1>待办清单</h1>

  <!-- 卡片面板：顶部渐变条由 .panel::before 这个伪元素画出来 -->
  <section class="panel">
    <div class="tabs">
      <button class="tab" :class="{ on: filter === 'all' }" @click="filter = 'all'">全部</button>
      <button class="tab" :class="{ on: filter === 'done' }" @click="filter = 'done'">
        已完成
      </button>
      <button class="tab" :class="{ on: filter === 'active' }" @click="filter = 'active'">
        未完成
      </button>
    </div>

    <p class="count">还剩 {{ list.filter((t) => !t.done).length }} 件</p>

    <ul class="list">
      <TodoItem
        v-for="(item, i) in visibleList"
        :key="item.id"
        :todo="item"
        :index="i"
        @toggle="toggle"
        @remove="remove"
      />
    </ul>

    <p v-if="list.length === 0" class="empty">今天没事，去休息！</p>

    <div class="field">
      <input v-model="draft" placeholder="要做点什么？" />
      <button @click="addTodo">添加</button>
    </div>
  </section>
</template>

<style scoped></style>

<template>
  <div class="h-64 bg-[#0d1117] border-t border-[#333] flex flex-col font-mono text-sm">

    <!-- Header -->
    <div class="h-9 px-4 flex items-center justify-between border-b border-[#333] bg-[#161b22] select-none">
      <div class="flex items-center gap-2 text-gray-400">
        <Terminal :size="14" />
        <span class="text-[11px] uppercase tracking-wider font-semibold">
          Console
        </span>
      </div>

      <button
        @click="emit('clear')"
        class="p-1 hover:bg-[#333] rounded text-gray-500 hover:text-red-400 transition-colors"
        title="Clear Output"
      >
        <Trash2 :size="14" />
      </button>
    </div>

    <!-- Logs -->
    <div
      ref="scrollRef"
      class="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-[#333]"
    >
      <div
        v-if="logs.length === 0"
        class="text-gray-600 italic"
      >
        No output. Press 'Run' to execute code...
      </div>

      <div
        v-else
        v-for="(log, i) in logs"
        :key="i"
        class="flex gap-2 group animate-in fade-in slide-in-from-left-2 duration-200"
      >
        <span class="text-gray-600 mt-1 flex-shrink-0">
          <ChevronRight :size="14" />
        </span>

        <div
          class="break-all whitespace-pre-wrap"
          :class="getLogColor(log.type)"
        >
          {{ log.content }}
        </div>

        <span class="ml-auto text-[10px] text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pt-1">
          {{ formatTime(log.timestamp) }}
        </span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref,watch,nextTick } from 'vue'
import { Terminal,Trash2,ChevronRight } from 'lucide-vue-next'
import type { LogEntry } from '../types'

const props=defineProps<{
  logs: LogEntry[]
}>()

const emit=defineEmits<{
  (e: 'clear'): void
}>()

const scrollRef=ref<HTMLDivElement|null>(null)

watch(
  () => props.logs,
  async () => {
    await nextTick()
    if(scrollRef.value) {
      scrollRef.value.scrollTop=scrollRef.value.scrollHeight
    }
  },
  { deep: true }
)

const getLogColor=(type: LogEntry['type']) => {
  switch(type) {
    case 'error':
      return 'text-red-400'
    case 'warn':
      return 'text-yellow-400'
    case 'info':
      return 'text-blue-400'
    default:
      return 'text-gray-300'
  }
}

const formatTime=(date: Date) => {
  return new Date(date).toLocaleTimeString()
}
</script>

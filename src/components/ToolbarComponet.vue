<template>
  <div class="h-12 bg-[#1e1e1e] border-b border-[#333] flex items-center justify-between px-4 select-none">

    <!-- Left Section -->
    <div class="flex items-center gap-4">

      <div class="flex items-center gap-2 text-blue-400 font-bold">
        <Cpu :size="20" />
        <span class="text-sm tracking-wider uppercase">Nuevo</span>
      </div>

      <div class="h-6 w-[1px] bg-[#333]" />

      <!-- Language Selector -->
      <div class="flex items-center gap-2 group relative">
        <select
          v-model="lengueaje"
          class="bg-transparent text-xs text-gray-400 hover:text-white transition-colors cursor-pointer appearance-none outline-none pr-4"
        >
          <option
            v-for="lang in LANGUAGES"
            :key="lang.value"
            :value="lang.value"
            class="bg-[#1e1e1e]"
          >
            {{ lang.label }}
          </option>
        </select>

        <ChevronDown
          :size="14"
          class="absolute right-0 text-gray-500 pointer-events-none group-hover:text-white transition-colors"
        />
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-2">

      <button
        @click="emit('clear')"
        class="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-[#333] rounded transition-all"
        title="Clear Console"
      >
        <RotateCcw :size="14" />
        <span>Reset</span>
      </button>

      <button
        @click="emit('run')"
        :disabled="isExecuting"
        :class="[
          'flex items-center gap-2 px-4 py-1.5 rounded text-xs font-semibold transition-all',
          isExecuting
            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-500 text-white shadow-lg active:scale-95'
        ]"
      >
        <Play
          :size="14"
          fill="currentColor"
        />
        <span>{{ isExecuting ? 'Running...' : 'Run' }}</span>
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { watch,ref } from 'vue'
import { Cpu,Play,RotateCcw,ChevronDown } from 'lucide-vue-next'
import type { SupportedLanguage } from '../types'
import { LANGUAGES } from '../contants'

interface Props {
  language: SupportedLanguage
  isExecuting: boolean
}

const props=defineProps<Props>()
const { isExecuting }=props
const lengueaje=ref(props.language)

const emit=defineEmits(['run','clear','languageChange']);

watch(lengueaje,(newElement) => {
  emit('languageChange',newElement)
})
</script>

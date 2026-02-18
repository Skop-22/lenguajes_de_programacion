<template>
  <div class="flex-1 h-full overflow-hidden bg-[#1e1e1e]">
    <MonacoEditor
      height="100%"
      :language="language"
      :value="code"
      theme="vs-dark"
      :options="editorOptions"
      @update:value="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MonacoEditor from '@guolao/vue-monaco-editor'
import type { SupportedLanguage } from '../types'

interface Props {
  code: string
  language: SupportedLanguage
}

const props=defineProps<Props>()

const emit=defineEmits<{
  (e: 'update:code',value: string): void
}>()

const handleChange=(value: string|undefined) => {
  emit('update:code',value??'')
}

const editorOptions=computed(() => ({
  fontSize: 14,
  fontFamily: "'Fira Code', monospace",
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  padding: { top: 16 },
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'on',
  lineNumbers: 'on',
  roundedSelection: true,
  scrollbar: {
    vertical: 'visible',
    horizontal: 'visible',
    useShadows: false,
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
  }
}))
</script>

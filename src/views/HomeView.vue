<script setup lang="ts">
import { ref } from 'vue'
import Toolbar from '../components/ToolbarComponet.vue'
import Editor from '../components/EditorComponent.vue'
import OutputPanel from '../components/OutputPanelComponent.vue'
import { useExecution } from '../useExecution'
import { INITIAL_CODE } from '../contants'
import type { SupportedLanguage } from '../types'

const language=ref<SupportedLanguage>('basic')
const code=ref<string>(INITIAL_CODE.basic)

const { logs,isExecuting,executeCode,clearLogs }=useExecution()

function handleLanguageChange(newLang: SupportedLanguage) {
  if(
    code.value!==INITIAL_CODE[language.value]&&
    !confirm('Switching language will reset your code. Continue?')
  ) {
    return
  }

  language.value=newLang
  code.value=INITIAL_CODE[newLang]
}

function handleRun() {
  executeCode(code.value,language.value)
}
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden text-gray-300">
    <Toolbar
      :language="language"
      :isExecuting="isExecuting"
      @languageChange="handleLanguageChange"
      @run="handleRun"
      @clear="clearLogs"
    />

    <div class="flex-1 flex overflow-hidden">

      <div class="flex-1 flex flex-col overflow-hidden relative">
        <!-- Tab bar -->
        <div class="h-9 bg-[#252526] flex items-center px-4 border-b border-[#1e1e1e] select-none">
          <div class="h-full border-t-2 border-blue-400 bg-[#1e1e1e] px-4 flex items-center gap-2">
            <span class="text-[11px] text-gray-300">
              index.
              {{
                language === 'javascript'
                  ? 'js'
                  : language
              }}
            </span>
            <span class="text-[10px] text-gray-600 mt-0.5">✕</span>
          </div>
        </div>

        <Editor
          :code="code"
          :language="language"
          @update:code="val => code = val || ''"
        />

        <OutputPanel
          :logs="logs"
          @clear="clearLogs"
        />
      </div>
    </div>

    <!-- Status Bar -->
    <div class="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-[11px] select-none font-medium">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1 hover:bg-[#ffffff20] px-1 cursor-pointer">
          <span>Ready</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <span class="hover:bg-[#ffffff20] px-1 cursor-pointer">UTF-8</span>
        <span class="hover:bg-[#ffffff20] px-1 cursor-pointer uppercase">
          {{ language }}
        </span>
        <span class="hover:bg-[#ffffff20] px-1 cursor-pointer">Spaces: 2</span>
      </div>
    </div>
  </div>
</template>

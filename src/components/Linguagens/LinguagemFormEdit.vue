<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Linguagem } from '@/types/LinguagemType'
import { LinguagemService } from '@/services/LinguagemService'

const props = defineProps<{ linguagem: Linguagem | null }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const descricao = ref('')
const versao = ref('')

watch(() => props.linguagem, (novo) => {
  if (novo) {
    descricao.value = novo.descricao ?? ''
    versao.value = novo.versao ?? ''
  } else {
    descricao.value = ''
    versao.value = ''
  }
}, { immediate: true })

async function salvarEdicao() {
  if (!props.linguagem) return
  try {
    await LinguagemService.atualizar(props.linguagem.uuid, { descricao: descricao.value, versao: versao.value })
    emit('save')
    emit('close')
  } catch (error) {
    console.error('Erro ao editar linguagem:', error)
    alert('Erro ao editar a linguagem.')
  }
}

function fechar(){
  emit('close')
}

</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">
          Editar Linguagem
        </h2>
        <div class="flex flex-col gap-4">
          <label class="block text-sm font-medium text-neutral-700 mb-2">Linguagem</label>
          <input 
            v-model="descricao" 
            type="text" 
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Versão</label>
          <input 
            v-model="versao" 
            type="text" 
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>

        <div class="flex justify-end mt-6 gap-3">
          <button
            @click="fechar"
            class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>

          <button 
            @click="salvarEdicao"
            class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Salvar
          </button>
        </div>  
      </div>
    </div>
</template>

<style scoped></style>
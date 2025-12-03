<script setup lang="ts">
import { ref, watch } from 'vue'
import type { BancoDeDados } from '@/types/BancoDeDadosType'
import { BancoDeDadosService } from '@/services/BancoDeDadosService'

const props = defineProps<{ bancoDeDados: BancoDeDados | null }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const descricao = ref('')
const versao = ref('')
const ip = ref('')
const porta = ref<number | null>(null)
const host = ref('')

watch(() => props.bancoDeDados, (novo) => {
  if (novo) {
    descricao.value = novo.descricao ?? ''
    versao.value = novo.versao ?? ''
    ip.value = novo.ip ?? ''
    porta.value = novo.porta ?? ''
    host.value = novo.host ?? ''
  } else {
    descricao.value = ''
    versao.value = ''
    ip.value = ''
    porta.value = null
    host.value = ''
  }
}, { immediate: true })

async function salvarEdicao() {
  if (!props.bancoDeDados) return
  try {
    await BancoDeDadosService.atualizar(props.bancoDeDados.uuid, { descricao: descricao.value, versao: versao.value, ip: ip.value, porta: porta.value, host: host.value })
    emit('save')
    emit('close')
  } catch (error) {
    console.error('Erro ao editar banco de dados:', error)
    alert('Erro ao editar a banco de dados.')
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
                Editar Banco de Dados
            </h2>
            <div class="flex flex-col gap-4">
                <label class="block text-sm font-medium text-neutral-700 mb-2">Banco de Dados</label>
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

                <label class="block text-sm font-medium text-neutral-700 mb-2">Ip</label>
                <input 
                    v-model="ip" 
                    type="text" 
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                />

                <label class="block text-sm font-medium text-neutral-700 mb-2">Porta</label>
                <input 
                    v-model="porta" 
                    type="number" 
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                />

                <label class="block text-sm font-medium text-neutral-700 mb-2">Host</label>
                <input 
                    v-model="host" 
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
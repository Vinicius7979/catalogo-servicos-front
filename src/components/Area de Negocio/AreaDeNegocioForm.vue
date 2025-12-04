<script setup lang="ts">
import { ref } from 'vue'
import { AreaDeNegocioService } from '@/services/AreaDeNegocioService'

const descricao = ref('')
const impacto = ref('')

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

async function salvar() {
  try {
    await AreaDeNegocioService.salvar({ descricao: descricao.value, impacto: impacto.value })
    emit('save')
    descricao.value = ''
    impacto.value = ''
    fechar()
  } catch (error) {
    console.error('Erro ao salvar área de négocio:', error)
    alert('Erro ao salvar área de négocio.')
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
            Cadastrar Área de Negócio
            </h2>
            <div class="flex flex-col gap-4">
                <label class="block text-sm font-medium text-neutral-700 mb-2">Área de Négocio</label>
                <input 
                    v-model="descricao" 
                    type="text" 
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                />

                <label class="block text-sm font-medium text-neutral-700 mb-2">Impacto</label>
                <input 
                    v-model="impacto" 
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
                    @click="salvar"
                    class="px-4 py-2 rounded-lg bg-green-500 hover:bg-gray-400 transition"
                >
                    Salvar
                </button>
            </div>  
        </div>
    </div>
</template>

<style scoped></style>
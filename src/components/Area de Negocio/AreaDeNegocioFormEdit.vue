<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AreaDeNegocio } from '@/types/AreaDeNegocioType'
import { AreaDeNegocioService } from '@/services/AreaDeNegocioService'

const props = defineProps<{ areaDeNegocio: AreaDeNegocio | null }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const descricao = ref('')
const impacto = ref('')

watch(() => props.areaDeNegocio, (novo) => {
  if (novo) {
    descricao.value = novo.descricao ?? ''
    impacto.value = novo.impacto ?? ''
  } else {
    descricao.value = ''
    impacto.value = ''
  }
}, { immediate: true })

async function salvarEdicao() {
  if (!props.areaDeNegocio) return
  try {
    await AreaDeNegocioService.atualizar(props.areaDeNegocio.uuid, { descricao: descricao.value, impacto: impacto.value })
    emit('save')
    emit('close')
  } catch (error) {
    console.error('Erro ao editar área de négocio:', error)
    alert('Erro ao editar a área de négocio.')
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
                Editar Área de Negócio
            </h2>
            <div class="flex flex-col gap-4">
                <label class="block text-sm font-medium text-neutral-700 mb-2">área de Negócio</label>
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
<script setup lang="ts">
import { ref } from 'vue'
import { DeployService } from '@/services/DeployService'

const versao = ref('')
const hash = ref('')
const plataforma = ref('')
const tipoPipeline = ref('')
const servidorAplicacaoSelecionado = ref<string | null>(null)
const moduloSelecionado = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

async function salvar() {
  try {
    await DeployService.salvar({ versao: versao.value, hash: hash.value, plataforma: plataforma.value, tipoPipeline: tipoPipeline.value, servidorAplicacaoUuid: servidorAplicacaoSelecionado.value, moduloUuid: moduloSelecionado.value })
    emit('save')
    versao.value = ''
    hash.value = ''
    plataforma.value = ''
    tipoPipeline.value = ''
    fechar()
  } catch (error) {
    console.error('Erro ao salvar deploy:', error)
    alert('Erro ao salvar deploy.')
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
          Cadastrar Deploy
        </h2>
        <div class="flex flex-col gap-4">
          <label class="block text-sm font-medium text-neutral-700 mb-2">Deploy</label>
          <input 
            v-model="versao" 
            type="text" 
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Hash</label>
          <input 
            v-model="hash" 
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label >Plataforma</label>
          <select
            v-model="plataforma"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option disabled value="">--Selecione--</option>
            <option value="CONTAINER">Container</option>
            <option value="CLOUD">Cloud</option>
            <option value="NATIVA">Nativa</option>
            <option value="VIRTUALIZADA">Virtualizada</option>
          </select>

          <label >Tipo de Pipeline</label>
          <select
            v-model="tipoPipeline"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option disabled value="">--Selecione--</option>
            <option value="JENKINS">Jenkins</option>
            <option value="GITLAB_RUNNER">GitLab Runner</option>
          </select>
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
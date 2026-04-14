<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { DeployService } from '@/services/DeployService'
import DeployList from '@/components/Deploy/DeployList.vue'
//import DeployForm from '@/components/Deploy/DeployForm.vue'
//import DeployFormEdit from '@/components/Deploy/DeployFormEdit.vue'
import ConfirmacaoRemocaoDeploy from '@/components/Deploy/ConfirmacaoRemocaoDeploy.vue'
import type { Deploy } from '@/types/DeployType'

const deploys = ref<Deploy[]>([])
const loading = ref(true)
const erro = ref('')
const adicionarForm = ref(false)
const editarForm = ref(false)
const deploySelecionado = ref<Deploy | null>(null)
const mostrarConfirmacaoRemocao = ref(false)
const uuidParaRemover = ref<string | null>(null)

async function carregarDeploys() {
  try {
    loading.value = true
    erro.value = ''
    const { data } = await DeployService.listar()

    let itensArray: Deploy[] = []
    
    itensArray = data.dados;

    if (Array.isArray(itensArray) && itensArray.length > 0 && Array.isArray(itensArray[0])) {
      itensArray = itensArray.flat()
    }

    deploys.value = (itensArray).map((it: Deploy) => ({
      uuid: it.uuid,
      versao: it.versao,
      hash: it.hash,
      plataforma: it.plataforma,
      tipoPipeline: it.tipoPipeline,
      servidorAplicacaoUuid: it.servidorAplicacaoUuid,
      moduloUuid: it.moduloUuid,
      ativo: it.ativo,
    }));

  } catch (error) {
    console.error('Erro ao carregar deploys:', error)
    erro.value = 'Erro ao carregar deploys.'
    deploys.value = [] // deixa a lista vazia pra evitar dados antigos ou invalidos, coisas do tipo.
  } finally {
    loading.value = false
  }
}

function abrirEditar(dep: Deploy) {
  deploySelecionado.value = dep
  editarForm.value = true
}

function fecharEditar() {
  editarForm.value = false
  deploySelecionado.value = null
}

function handleSaveEdit() {
  carregarDeploys()
  fecharEditar()
}

function abrirConfirmacaoRemocao(uuid: string) {
  uuidParaRemover.value = uuid
  mostrarConfirmacaoRemocao.value = true
}

function cancelarRemocao() {
  mostrarConfirmacaoRemocao.value = false
  uuidParaRemover.value = null
}

async function confirmarRemocao() {
  if (!uuidParaRemover.value) return
  
  try {
    await DeployService.deletar(uuidParaRemover.value)
    await carregarDeploys()
    cancelarRemocao()
  } catch (error) {
    console.error('Erro ao remover deploy:', error)
    erro.value = 'Erro ao remover deploy.'
    mostrarConfirmacaoRemocao.value = false
  }
}

onMounted(() => {
  carregarDeploys()
})
</script>

<template>
    <section class="flex-1 p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-neutral-800 mb-2">Deploys</h1>
    </div>

    <DeployForm 
      v-if="adicionarForm"
      @close="adicionarForm = false"
      @save="carregarDeploys"
    />

    <DeployFormEdit 
      v-if="editarForm"
      :deploy="deploySelecionado"
      @close="fecharEditar"
      @save="handleSaveEdit" 
    />

    <ConfirmacaoRemocaoDeploy
      v-if="mostrarConfirmacaoRemocao"
      @cancel="cancelarRemocao"
      @confirm="confirmarRemocao"
    />

    <div 
      v-if="erro"
      class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
    >
      {{ erro }}
    </div>

    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-6 border-b border-neutral-200">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-neutral-800">Deploys Cadastrados</h2>
          <div class="ml-4">
            <button
              @click="adicionarForm = true"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
            
      <div v-if="loading" class="p-6 text-center text-neutral-500">
        <p>Carregando deploys...</p>
      </div>

      <div v-else class="overflow-x-auto">
          <DeployList 
            :deploys="deploys"
            @remover="abrirConfirmacaoRemocao"
            @editar="abrirEditar"
          />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
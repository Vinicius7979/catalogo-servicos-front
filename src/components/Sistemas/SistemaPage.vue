<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SistemaService } from '@/services/SistemaService'
import SistemaList from '@/components/Sistemas/SistemaList.vue'
import SistemaForm from '@/components/Sistemas/SistemaForm.vue'
//import SistemaFormEdit from '@/components/Sistemas/LinguagemFormEdit.vue'
import ConfirmacaoRemocaoSistema from '@/components/Sistemas/ConfirmacaoRemocaoSistema.vue'
import type { Sistema } from '@/types/SistemaType'

const sistemas = ref<Sistema[]>([])
const loading = ref(true)
const erro = ref('')
const adicionarForm = ref(false)
const editarForm = ref(false)
const sistemaSelecionado = ref<Sistema | null>(null)
const mostrarConfirmacaoRemocao = ref(false)
const uuidParaRemover = ref<string | null>(null)

async function carregarSistemas() {
  try {
    loading.value = true
    erro.value = ''
    const { data } = await SistemaService.listar()

    let itensArray: Sistema[] = []
    
    itensArray = data.dados;

    if (Array.isArray(itensArray) && itensArray.length > 0 && Array.isArray(itensArray[0])) {
      itensArray = itensArray.flat()
    }

    sistemas.value = (itensArray).map((it: Sistema) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      versao: it.versao,
      sigla: it.sigla,
      url: it.url,
      status: it.status,
      autenticacao: it.autenticacao,
      segmentoUuid: it.segmentoUuid,
      setorUuid: it.setorUuid,
      areaDeNegocioUuid: it.areaDeNegocioUuid,
      responsavel: it.responsavel,
      modulo: it.modulo,
      ativo: it.ativo,
    }));

  } catch (error) {
    console.error('Erro ao carregar sistemas:', error)
    erro.value = 'Erro ao carregar sistemas.'
    sistemas.value = []
  } finally {
    loading.value = false
  }
}

function abrirEditar(sis: Sistema) {
  sistemaSelecionado.value = sis
  editarForm.value = true
}

// function fecharEditar() {
//   editarForm.value = false
//   sistemaSelecionado.value = null
// }

// function handleSaveEdit() {
//   carregarSistemas()
//   fecharEditar()
// }

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
    await SistemaService.deletar(uuidParaRemover.value)
    await carregarSistemas()
    cancelarRemocao()
  } catch (error) {
    console.error('Erro ao remover sistema:', error)
    erro.value = 'Erro ao remover sistema.'
    mostrarConfirmacaoRemocao.value = false
  }
}

onMounted(() => {
  carregarSistemas()
})
</script>

<template>
    <section class="flex-1 p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-neutral-800 mb-2">Sistemas</h1>
    </div>

    <SistemaForm 
      v-if="adicionarForm"
      @close="adicionarForm = false"
      @save="carregarSistemas"
    />

    <!-- <SistemaFormEdit 
      v-if="editarForm"
      :linguagem="sistemaSelecionado"
      @close="fecharEditar"
      @save="handleSaveEdit" 
    /> -->

    <ConfirmacaoRemocaoSistema
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
          <h2 class="text-lg font-semibold text-neutral-800">Sistemas Cadastrados</h2>
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
        <p>Carregando sistemas...</p>
      </div>

      <div v-else class="overflow-x-auto">
          <SistemaList 
            :sistemas="sistemas"
            @remover="abrirConfirmacaoRemocao"
            @editar="abrirEditar"
          />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
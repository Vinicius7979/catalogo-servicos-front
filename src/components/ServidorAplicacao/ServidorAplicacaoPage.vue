<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ServidorAplicacaoService } from '@/services/ServidorAplicacaoService'
import ServidorAplicacaoList from '@/components/ServidorAplicacao/ServidorAplicacaoList.vue'
import ServidorAplicacaoForm from '@/components/ServidorAplicacao/ServidorAplicacaoForm.vue'
import ServidorAplicacaoFormEdit from '@/components/ServidorAplicacao/ServidorAplicacaoFormEdit.vue'
import ConfirmacaoRemocaoServidorAplicacao from '@/components/ServidorAplicacao/ConfirmacaoRemocaoServidorAplicacao.vue'
import type { ServidorAplicacao } from '@/types/ServidorAplicacaoType'

const servidoresAplicacao = ref<ServidorAplicacao[]>([])
const loading = ref(true)
const erro = ref('')
const adicionarForm = ref(false)
const editarForm = ref(false)
const servidorAplicacaoSelecionada = ref<ServidorAplicacao | null>(null)
const mostrarConfirmacaoRemocao = ref(false)
const uuidParaRemover = ref<string | null>(null)

async function carregarServidoresAplicacao() {
  try {
    loading.value = true
    erro.value = ''
    const { data } = await ServidorAplicacaoService.listar()

    let itensArray: ServidorAplicacao[] = []
    
    itensArray = data.dados;

    if (Array.isArray(itensArray) && itensArray.length > 0 && Array.isArray(itensArray[0])) {
      itensArray = itensArray.flat()
    }

    servidoresAplicacao.value = (itensArray).map((it: ServidorAplicacao) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      versao: it.versao,
      ip: it.ip,
      ambiente: it.ambiente,
      tipoServidor: it.tipoServidor,
      orquestrador: it.orquestrador,
      url: it.url,
      porta: it.porta,
      ipProxy: it.ipProxy,
      hostName: it.hostName,
      distribuicao: it.distribuicao,
      ativo: it.ativo,
    }));

  } catch (error) {
    console.error('Erro ao carregar servidores aplicação:', error)
    erro.value = 'Erro ao carregar servidores aplicação.'
    servidoresAplicacao.value = []
  } finally {
    loading.value = false
  }
}

function abrirEditar(serv: ServidorAplicacao) {
  servidorAplicacaoSelecionada.value = serv
  editarForm.value = true
}

function fecharEditar() {
  editarForm.value = false
  servidorAplicacaoSelecionada.value = null
}

function handleSaveEdit() {
  carregarServidoresAplicacao()
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
    await ServidorAplicacaoService.deletar(uuidParaRemover.value)
    await carregarServidoresAplicacao()
    cancelarRemocao()
  } catch (error) {
    console.error('Erro ao remover servidor aplicação:', error)
    erro.value = 'Erro ao remover servidor aplicação.'
    mostrarConfirmacaoRemocao.value = false
  }
}

onMounted(() => {
  carregarServidoresAplicacao()
})
</script>

<template>
    <section class="flex-1 p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-neutral-800 mb-2">Servidor Aplicação</h1>
    </div>

    <ServidorAplicacaoForm 
      v-if="adicionarForm"
      @close="adicionarForm = false"
      @save="carregarServidoresAplicacao"
    />

    <ServidorAplicacaoFormEdit 
      v-if="editarForm"
      :servidorAplicacao="servidorAplicacaoSelecionada"
      @close="fecharEditar"
      @save="handleSaveEdit" 
    />

    <ConfirmacaoRemocaoServidorAplicacao
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
          <h2 class="text-lg font-semibold text-neutral-800">Servidores Aplicação Cadastrados</h2>
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
        <p>Carregando servidores aplicação...</p>
      </div>

      <div v-else class="overflow-x-auto">
          <ServidorAplicacaoList 
            :servidoresAplicacao="servidoresAplicacao"
            @remover="abrirConfirmacaoRemocao"
            @editar="abrirEditar"
          />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
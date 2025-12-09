<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SegmentoService } from '@/services/SegmentoService'
import SegmentoList from '@/components/Segmento/SegmentoList.vue'
import SegmentoForm from '@/components/Segmento/SegmentoForm.vue'
import ConfirmacaoRemocaoSegmento from '@/components/Segmento/ConfirmacaoRemocaoSegmento.vue'
import type { Segmento } from '@/types/SegmentoType'
import SegmentoFormEdit from '@/components/Segmento/SegmentoFormEdit.vue'

const segmentos = ref<Segmento[]>([])
const loading = ref(true)
const erro = ref('')
const adicionarForm = ref(false)
const editarForm = ref(false)
const segmentoSelecionada = ref<Segmento | null>(null)
const mostrarConfirmacaoRemocao = ref(false)
const uuidParaRemover = ref<string | null>(null)

async function carregarSegmentos() {
  try {
    loading.value = true
    erro.value = ''
    const { data } = await SegmentoService.listar()

    let itensArray: Segmento[] = []
    
    itensArray = data.dados;

    if (Array.isArray(itensArray) && itensArray.length > 0 && Array.isArray(itensArray[0])) {
      itensArray = itensArray.flat()
    }

    segmentos.value = (itensArray).map((it: Segmento) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      ativo: it.ativo,
    }));

  } catch (error) {
    console.error('Erro ao carregar segmentos:', error)
    erro.value = 'Erro ao carregar segmentos.'
    segmentos.value = []
  } finally {
    loading.value = false
  }
}

function abrirEditar(seg: Segmento) {
  segmentoSelecionada.value = seg
  editarForm.value = true
}

function fecharEditar() {
  editarForm.value = false
  segmentoSelecionada.value = null
}

function handleSaveEdit() {
  carregarSegmentos()
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
    await SegmentoService.deletar(uuidParaRemover.value)
    await carregarSegmentos()
    cancelarRemocao()
  } catch (error) {
    console.error('Erro ao remover segmento:', error)
    erro.value = 'Erro ao remover segmento.'
    mostrarConfirmacaoRemocao.value = false
  }
}

onMounted(() => {
  carregarSegmentos()
})
</script>

<template>
    <section class="flex-1 p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-neutral-800 mb-2">Segmentos</h1>
    </div>

    <SegmentoForm 
      v-if="adicionarForm"
      @close="adicionarForm = false"
      @save="carregarSegmentos"
    />

    <SegmentoFormEdit
      v-if="editarForm"
      :segmento="segmentoSelecionada"
      @close="fecharEditar"
      @save="handleSaveEdit" 
    />

    <ConfirmacaoRemocaoSegmento
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
          <h2 class="text-lg font-semibold text-neutral-800">Segmentos Cadastradas</h2>
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
        <p>Carregando segmentos...</p>
      </div>

      <div v-else class="overflow-x-auto">
          <SegmentoList 
            :segmentos="segmentos"
            @remover="abrirConfirmacaoRemocao"
            @editar="abrirEditar"
          />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
<script lang="ts">
import { ref, onMounted } from 'vue'
import { SegmentoService } from '@/services/SegmentoService'
import SegmentoList from '@/components/Segmentos/SegmentoList.vue'
import SegmentoForm from '@/components/Segmentos/SegmentoForm.vue'
import SegmentoFormEdit from '@/components/Segmentos/SegmentoFormEdit.vue'
import ConfirmacaoRemocaoSegmento from '@/components/Segmento/ConfirmacaoRemocaoSegmento.vue'
import type { Segmento } from '@/types/SegmentoType'

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

<template></template>

<style scoped></style>
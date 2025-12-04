<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AreaDeNegocioService } from '@/services/AreaDeNegocioService'
import AreaDeNegocioList from '@/components/Area de Negocio/AreaDeNegocioList.vue'
import AreaDeNegocioForm from '@/components/Area de Negocio/AreaDeNegocioForm.vue'
import AreaDeNegocioFormEdit from '@/components/Area de Negocio/AreaDeNegocioFormEdit.vue'
import ConfirmacaoRemocaoAreaDeNegocio from '@/components/Area de Negocio/ConfirmacaoRemocaoAreaDeNegocio.vue'
import type { AreaDeNegocio } from '@/types/AreaDeNegocioType'

const areasDeNegocio = ref<AreaDeNegocio[]>([])
const loading = ref(true)
const erro = ref('')
const adicionarForm = ref(false)
const editarForm = ref(false)
const areaDeNegocioSelecionada = ref<AreaDeNegocio | null>(null)
const mostrarConfirmacaoRemocao = ref(false)
const uuidParaRemover = ref<string | null>(null)

async function carregarAreasDeNegocio() {
  try {
    loading.value = true
    erro.value = ''
    const { data } = await AreaDeNegocioService.listar()

    let itensArray: AreaDeNegocio[] = []
    
    itensArray = data.dados;

    if (Array.isArray(itensArray) && itensArray.length > 0 && Array.isArray(itensArray[0])) {
      itensArray = itensArray.flat()
    }

    areasDeNegocio.value = (itensArray).map((it: AreaDeNegocio) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      impacto: it.impacto,
      ativo: it.ativo,
    }));

  } catch (error) {
    console.error('Erro ao carregar áreas de negócio:', error)
    erro.value = 'Erro ao carregar áreas de negócio.'
    areasDeNegocio.value = []
  } finally {
    loading.value = false
  }
}

function abrirEditar(area: AreaDeNegocio) {
  areaDeNegocioSelecionada.value = area
  editarForm.value = true
}

function fecharEditar() {
  editarForm.value = false
  areaDeNegocioSelecionada.value = null
}

function handleSaveEdit() {
  carregarAreasDeNegocio()
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
    await AreaDeNegocioService.deletar(uuidParaRemover.value)
    await carregarAreasDeNegocio()
    cancelarRemocao()
  } catch (error) {
    console.error('Erro ao remover áreas de negócio:', error)
    erro.value = 'Erro ao remover áreas de negócio.'
    mostrarConfirmacaoRemocao.value = false
  }
}

onMounted(() => {
  carregarAreasDeNegocio()
})
</script>

<template></template>

<style scoped></style>
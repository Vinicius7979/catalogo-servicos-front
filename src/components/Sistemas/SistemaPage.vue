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
      ativo: it.ativo,
    }));

  } catch (error) {
    console.error('Erro ao carregar sistemas:', error)
    erro.value = 'Erro ao carregar sistemas.'
    sistemas.value = [] // deixa a lista vazia pra evitar dados antigos ou invalidos, coisas do tipo.
  } finally {
    loading.value = false
  }
}

function abrirEditar(sis: Sistema) {
  sistemaSelecionado.value = sis
  editarForm.value = true
}

function fecharEditar() {
  editarForm.value = false
  sistemaSelecionado.value = null
}

function handleSaveEdit() {
  carregarSistemas()
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

<template></template>

<style scoped></style>
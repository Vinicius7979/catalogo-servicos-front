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

<template></template>

<style scoped></style>
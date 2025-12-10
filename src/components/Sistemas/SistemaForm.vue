<script setup lang="ts">
import { ref } from 'vue'
import { SistemaService } from '@/services/SistemaService'

const descricao = ref('')
const versao = ref('')
const sigla = ref('')
const url = ref('')
const status = ref('')
const autenticacao = ref('')
const segmentoSelecionado = ref<string | null>(null)
const setorSelecionado = ref<string | null>(null)
const areaDeNegocioSelecionado = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

async function salvar() {
  try {
    await SistemaService.salvar({ descricao: descricao.value, versao: versao.value, sigla: sigla.value, url: url.value, status: status.value, autenticacao: autenticacao.value, segmentoSelecionado: segmentoSelecionado.value, setorSelecionado: setorSelecionado.value, areaDeNegocioSelecionado: areaDeNegocioSelecionado.value, })
    emit('save')
    descricao.value = ''
    versao.value = ''
    sigla.value = ''
    url.value = ''
    status.value = ''
    autenticacao.value = ''
    segmentoSelecionado.value = ''
    setorSelecionado.value = ''
    areaDeNegocioSelecionado.value = ''
    fechar()
  } catch (error) {
    console.error('Erro ao salvar sistema:', error)
    alert('Erro ao salvar sistema.')
  }
}

function fechar(){
  emit('close')
}
</script>

<template></template>

<style scoped></style>
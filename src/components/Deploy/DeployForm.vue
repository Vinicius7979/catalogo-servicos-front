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

<template></template>

<style scoped></style>
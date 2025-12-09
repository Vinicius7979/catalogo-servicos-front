<script setup lang="ts">
import { ref } from 'vue'
import { ServidorAplicacaoService } from '@/services/ServidorAplicacaoService'

const descricao = ref('')
const versao = ref('')
const ip = ref('')
const ambiente = ref('')
const tipoServidor = ref('')
const orquestrador = ref('')
const url = ref('')
const porta = ref('')
const ipProxy = ref('')
const hostName = ref('')
const distribuicao = ref('')

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

async function salvar() {
  try {
    await ServidorAplicacaoService.salvar({ descricao: descricao.value, versao: versao.value, ip: ip.value, ambiente: ambiente.value, tipoServidor: tipoServidor.value, orquestrador: orquestrador.value, url: url.value, porta: porta.value, ipProxy: ipProxy.value, hostName: hostName.value, distribuicao: distribuicao.value, })
    emit('save')
    descricao.value = ''
    versao.value = ''
    ip.value = ''
    ambiente.value = ''
    tipoServidor.value = ''
    orquestrador.value = ''
    url.value = ''
    porta.value = ''
    ipProxy.value = ''
    hostName.value = ''
    distribuicao.value = ''
    fechar()
  } catch (error) {
    console.error('Erro ao salvar servidor aplicação:', error)
    alert('Erro ao salvar servidor aplicação.')
  }
}

function fechar(){
  emit('close')
}
</script>

<template></template>

<style scoped></style>
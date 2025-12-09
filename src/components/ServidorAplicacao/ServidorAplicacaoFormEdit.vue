<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ServidorAplicacao } from '@/types/ServidorAplicacaoType'
import { ServidorAplicacaoService } from '@/services/ServidorAplicacaoService'

const props = defineProps<{ servidorAplicacao: ServidorAplicacao | null }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const descricao = ref('')
const versao = ref('')
const ip = ref('')
const ambiente = ref('')
const tipoServidor = ref('')
const orquestrador = ref('')
const url = ref('')
const porta = ref<number | null>(null)
const ipProxy = ref('')
const hostName = ref('')
const distribuicao = ref('')

watch(() => props.servidorAplicacao, (novo) => {
  if (novo) {
    descricao.value = novo.descricao ?? ''
    versao.value = novo.versao ?? ''
    ip.value = novo.ip ?? ''
    ambiente.value = novo.ambiente ?? ''
    tipoServidor.value = novo.tipoServidor ?? ''
    orquestrador.value = novo.orquestrador ?? ''
    url.value = novo.url ?? ''
    porta.value = novo.porta ?? ''
    ipProxy.value = novo.ipProxy ?? ''
    hostName.value = novo.hostName ?? ''
    distribuicao.value = novo.distribuicao ?? ''
  } else {
    descricao.value = ''
    versao.value = ''
    ip.value = ''
    ambiente.value = ''
    tipoServidor.value = ''
    orquestrador.value = ''
    url.value = ''
    porta.value = null
    ipProxy.value = ''
    hostName.value = ''
    distribuicao.value = ''
  }
}, { immediate: true })

async function salvarEdicao() {
  if (!props.servidorAplicacao) return
  try {
    await ServidorAplicacaoService.atualizar(props.servidorAplicacao.uuid, { descricao: descricao.value, versao: versao.value, ip: ip.value, ambiente: ambiente.value, tipoServidor: tipoServidor.value, orquestrador: orquestrador.value, url: url.value, porta: porta.value, ipProxy: ipProxy.value, hostName: hostName.value, distribuicao: distribuicao.value })
    emit('save')
    emit('close')
  } catch (error) {
    console.error('Erro ao editar servidor aplicação:', error)
    alert('Erro ao editar a servidor aplicação.')
  }
}

function fechar(){
  emit('close')
}
</script>

<template></template>

<style scoped></style>
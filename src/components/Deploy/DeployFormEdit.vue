<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Deploy } from '@/types/DeployType'
import { DeployService } from '@/services/DeployService'
import type { ServidorAplicacao } from '@/types/ServidorAplicacaoType'
import { ServidorAplicacaoService } from '@/services/ServidorAplicacaoService'
import { ModuloService } from '@/services/ModuloService'
import type { Modulo } from '@/types/ModuloType'

const props = defineProps<{ deploy: Deploy | null }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const versao = ref('')
const hash = ref('')
const plataforma = ref('')
const tipoPipeline = ref('')
const servidorAplicacaoSelecionado = ref<string | null>(null)
const moduloSelecionado = ref<string | null>(null)
const servidores = ref<ServidorAplicacao[]>([])
const modulos = ref<Modulo[]>([])

watch(() => props.deploy, (novo) => {
  if (novo) {
    versao.value = novo.versao ?? ''
    hash.value = novo.hash ?? ''
    plataforma.value = novo.plataforma ?? ''
    tipoPipeline.value = novo.tipoPipeline ?? ''
  } else {
    versao.value = ''
    hash.value = ''
  }
}, { immediate: true })

async function listarServidoresAplicacao(){
  try {
    const { data } = await ServidorAplicacaoService.listar()
    let itemsArray: ServidorAplicacao[] = []
    itemsArray = data.dados;
    if (Array.isArray(itemsArray) && itemsArray.length > 0 && Array.isArray(itemsArray[0])) {
      itemsArray = itemsArray.flat()
    }
    servidores.value = (itemsArray).map((it: ServidorAplicacao) => ({
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
    }))
  }catch (error) {
    console.error('Erro ao listar servidores de aplicação:', error)
    alert('Erro ao listar servidores de aplicação.')
  }
}

async function listarModulos(){
  try {
    const { data } = await ModuloService.listar()
    let itemsArray: Modulo[] = []
    itemsArray = data.dados;
    if (Array.isArray(itemsArray) && itemsArray.length > 0 && Array.isArray(itemsArray[0])) {
      itemsArray = itemsArray.flat()
    }
    modulos.value = (itemsArray).map((it: Modulo) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      documentacaoUrl: it.documentacaoUrl,
      url: it.url,
      porta: it.porta,
      gitUrl: it.gitUrl,
      armazenamento: it.armazenamento,
      tipoTecnologia: it.tipoTecnologia,
      tecnologiaUuid: it.tecnologiaUuid,
      tipoModulo: it.tipoModulo,
      ativo: it.ativo,
    }))
  }catch (error) {
    console.error('Erro ao listar módulos:', error)
    alert('Erro ao listar módulos.')
  }
}

async function salvarEdicao() {
  if (!props.deploy) return
  try {
    await DeployService.atualizar(props.deploy.uuid, { versao: versao.value, hash: hash.value })
    emit('save')
    emit('close')
  } catch (error) {
    console.error('Erro ao editar deploy:', error)
    alert('Erro ao editar o deploy.')
  }
}

function fechar(){
  emit('close')
}
</script>

<template></template>

<style></style>
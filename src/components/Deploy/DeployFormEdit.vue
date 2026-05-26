<script setup lang="ts">
import { onMounted } from 'vue'
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
    servidorAplicacaoSelecionado.value = (novo.servidorAplicacaoUuid as string) ?? null
    moduloSelecionado.value = (novo.moduloUuid as string) ?? null
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
    await DeployService.atualizar(props.deploy.uuid, { versao: versao.value, hash: hash.value, plataforma: plataforma.value, tipoPipeline: tipoPipeline.value, servidorAplicacaoUuid: servidorAplicacaoSelecionado.value, moduloUuid: moduloSelecionado.value })
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

onMounted(() => {
  listarModulos()
})

onMounted(() => {
  listarServidoresAplicacao()
})
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">
          Editar Deploy
        </h2>
        <div class="flex flex-col gap-4">
          <label class="block text-sm font-medium text-neutral-700 mb-2">Versão</label>
          <input 
            v-model="versao" 
            type="text" 
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Hash</label>
          <input 
            v-model="hash" 
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label >Plataforma</label>
          <select
            v-model="plataforma"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option disabled value="">--Selecione--</option>
            <option value="CONTAINER">Container</option>
            <option value="CLOUD">Cloud</option>
            <option value="NATIVA">Nativa</option>
            <option value="VIRTUALIZADA">Virtualizada</option>
          </select>

          <label >Tipo de Pipeline</label>
          <select
            v-model="tipoPipeline"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option disabled value="">--Selecione--</option>
            <option value="JENKINS">Jenkins</option>
            <option value="GITLAB_RUNNER">GitLab Runner</option>
          </select>

          <label class="block text-sm font-medium text-neutral-700 mb-2">Servidor de Aplicação:</label>
          <select name="servidores" v-model="servidorAplicacaoSelecionado" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option :value="null">--Selecione--</option>
            <option v-for="(serv, index) in servidores" :key="serv.uuid ?? (serv.descricao + '-' + index)" :value="serv.uuid">{{ serv.descricao }} - {{ serv.versao }}</option>
          </select>

          <label class="block text-sm font-medium text-neutral-700 mb-2">Modulo:</label>
          <select name="modulos" v-model="moduloSelecionado" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option :value="null">--Selecione--</option>
            <option v-for="(mod, index) in modulos" :key="mod.uuid ?? (mod.descricao + '-' + index)" :value="mod.uuid">{{ mod.descricao }} - {{ mod.porta }}</option>
          </select>
        </div>

        <div class="flex justify-end mt-6 gap-3">
          <button
            @click="fechar"
            class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>

          <button
            @click="salvarEdicao"
            class="px-4 py-2 rounded-lg bg-green-500 hover:bg-gray-400 transition"
          >
            Salvar
          </button>
        </div>  
      </div>
    </div>
</template>

<style scoped></style>
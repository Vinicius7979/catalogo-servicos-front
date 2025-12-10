<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SistemaService } from '@/services/SistemaService'
import { SegmentoService } from '@/services/SegmentoService'
import type { Segmento } from '@/types/SegmentoType'
import type { Setor } from '@/types/SetorType'
import type { AreaDeNegocio } from '@/types/AreaDeNegocioType'
import { SetorService } from '@/services/SetorService'
import { AreaDeNegocioService } from '@/services/AreaDeNegocioService'

const descricao = ref('')
const versao = ref('')
const sigla = ref('')
const url = ref('')
const status = ref('')
const autenticacao = ref('')
const segmentoSelecionado = ref<string | null>(null)
const setorSelecionado = ref<string | null>(null)
const areaDeNegocioSelecionado = ref<string | null>(null)
const segmentos = ref<Segmento[]>([])
const setores = ref<Setor[]>([])
const areasDeNegocio = ref<AreaDeNegocio[]>([])

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

async function listarSegmentos(){
  try {
    const { data } = await SegmentoService.listar()
    let itemsArray: Segmento[] = []
    itemsArray = data.dados;
    if (Array.isArray(itemsArray) && itemsArray.length > 0 && Array.isArray(itemsArray[0])) {
      itemsArray = itemsArray.flat()
    }
    segmentos.value = (itemsArray).map((it: Segmento) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      ativo: it.ativo,
    }))
  }catch (error) {
    console.error('Erro ao listar segmentos:', error)
    alert('Erro ao listar segmentos.')
  }
}

async function listarSetores(){
  try {
    const { data } = await SetorService.listar()
    let itemsArray: Setor[] = []
    itemsArray = data.dados;
    if (Array.isArray(itemsArray) && itemsArray.length > 0 && Array.isArray(itemsArray[0])) {
      itemsArray = itemsArray.flat()
    }
    setores.value = (itemsArray).map((it: Setor) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      ativo: it.ativo,
    }))
  }catch (error) {
    console.error('Erro ao listar setores:', error)
    alert('Erro ao listar setores.')
  }
}

async function listarAreasDeNegocio(){
  try {
    const { data } = await AreaDeNegocioService.listar()
    let itemsArray: AreaDeNegocio[] = []
    itemsArray = data.dados;
    if (Array.isArray(itemsArray) && itemsArray.length > 0 && Array.isArray(itemsArray[0])) {
      itemsArray = itemsArray.flat()
    }
    areasDeNegocio.value = (itemsArray).map((it: AreaDeNegocio) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      impacto: it.impacto,
      ativo: it.ativo,
    }))
  }catch (error) {
    console.error('Erro ao listar areas de negócio:', error)
    alert('Erro ao listar areas de negócio.')
  }
}

async function salvar() {
  try {
    await SistemaService.salvar({ descricao: descricao.value, versao: versao.value, sigla: sigla.value, url: url.value, status: status.value, autenticacao: autenticacao.value, segmentoUuid: segmentoSelecionado.value, setorUuid: setorSelecionado.value, areaDeNegocioUuid: areaDeNegocioSelecionado.value, })
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

onMounted(() => {
  listarSegmentos()
})

onMounted(() => {
  listarSetores()
})

onMounted(() => {
  listarAreasDeNegocio()
})

</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">
          Cadastrar Sistema
        </h2>
        <div class="flex flex-col gap-4">
          <label class="block text-sm font-medium text-neutral-700 mb-2">Sistema</label>
          <input 
            v-model="descricao" 
            type="text" 
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Versão</label>
          <input 
            v-model="versao" 
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Sigla</label>
          <input 
            v-model="sigla" 
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Url</label>
          <input 
            v-model="url" 
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                <select 
                    v-model="status" 
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required
                >
                    <option disabled value="">--Selecione--</option>
                    <option value="ATIVO">Ativo</option>
                    <option value="EM_USO">Em Uso</option>
                    <option value="SOMENTE_CONSULTA">Somente Consulta</option>
                    <option value="DESATIVADO">Desativado</option>
                </select> 

          <label class="block text-sm font-medium text-neutral-700 mb-2">Autenticação</label>
                <select 
                    v-model="autenticacao" 
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required
                >
                    <option disabled value="">--Selecione--</option>
                    <option value="SIGED">SIGED</option>
                    <option value="PMM">PMM</option>
                    <option value="PROPRIA">Própria</option>
                    <option value="NENHUM">Nenhum</option>
                </select> 

          <label class="block text-sm font-medium text-neutral-700 mb-2">Segmento:</label>
          <select name="segmentos" v-model="segmentoSelecionado" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option :value="null">--Selecione--</option>
            <option v-for="(seg, index) in segmentos" :key="seg.uuid ?? (seg.descricao + '-' + index)" :value="seg.uuid">{{ seg.descricao }}</option>
          </select>

          <label class="block text-sm font-medium text-neutral-700 mb-2">Setor:</label>
          <select name="setores" v-model="setorSelecionado" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option :value="null">--Selecione--</option>
            <option v-for="(set, index) in setores" :key="set.uuid ?? (set.descricao + '-' + index)" :value="set.uuid">{{ set.descricao }}</option>
          </select>

          <label class="block text-sm font-medium text-neutral-700 mb-2">Area de Negócio:</label>
          <select name="areasDeNegocio" v-model="areaDeNegocioSelecionado" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option :value="null">--Selecione--</option>
            <option v-for="(area, index) in areasDeNegocio" :key="area.uuid ?? (area.descricao + '-' + index)" :value="area.uuid">{{ area.descricao }}</option>
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
            @click="salvar"
            class="px-4 py-2 rounded-lg bg-green-500 hover:bg-gray-400 transition"
          >
            Salvar
          </button>
        </div>  
      </div>
    </div>
</template>

<style scoped></style>
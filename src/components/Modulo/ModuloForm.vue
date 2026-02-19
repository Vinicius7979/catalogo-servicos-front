<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ModuloService } from '@/services/ModuloService'
import { ArmazenamentoService } from '@/services/ArmazenamentoService'
import type { Armazenamento } from '@/types/ArmazenamentoType'
import { TecnologiaService } from '@/services/TecnologiaService'
import type { Tecnologia } from '@/types/TecnologiaType' 
import type { Modulo } from '@/types/ModuloType'
import ArmazenamentoForm from '@/components/Armazenamento/ArmazenamentoForm.vue'

const descricao = ref('')
const documentacaoUrl = ref('')
const url = ref('')
const porta = ref<number | null>(null)
const gitUrl = ref('')
const tipoTecnologia = ref('')
const tecnologiaSelecionada = ref<string | null>(null)
const armazenamentoSelecionado = ref<string[]>([])
const armazenamentos = ref<Armazenamento[]>([])
const tecnologias = ref<Tecnologia[]>([])
const mostrarArmazenamentoForm = ref(false)

const emit = defineEmits<{
  (e: 'save', modulo: Modulo): void
  (e: 'close'): void
}>()

function adicionarArmazenamento(novo: Armazenamento) {
  armazenamentos.value.push(novo)

  // se quiser já selecionar automaticamente
  armazenamentoSelecionado.value = [
    ...(Array.isArray(armazenamentoSelecionado.value)
      ? armazenamentoSelecionado.value
      : []),
    novo.uuid
  ]

  mostrarArmazenamentoForm.value = false
}

async function listarArmazenamentos() {
  try {
    const { data } = await ArmazenamentoService.listar()
    let itemsArray: Armazenamento[] = data.dados

    if (Array.isArray(itemsArray) && itemsArray.length > 0 && Array.isArray(itemsArray[0])) {
      itemsArray = itemsArray.flat()
    }

    armazenamentos.value = itemsArray.map(it => ({
      uuid: it.uuid,
      schema: it.schema,
      dblink: it.dblink,
      bancoDeDadosUuid: it.bancoDeDadosUuid,
      ativo: it.ativo
    }))
  } catch (error) {
    console.error('Erro ao listar armazenamentos:', error)
    alert('Erro ao listar armazenamentos.')
  }
}

async function listarTecnologias() {
  try {
    const { data } = await TecnologiaService.listar()
    let items = data.dados

    if (Array.isArray(items) && items.length > 0 && Array.isArray(items[0])) {
      items = items.flat()
    }

    tecnologias.value = items.map((tec: Tecnologia) => ({
      uuid: tec.uuid,
      descricao: tec.descricao,
      ativo: tec.ativo
    }))
  } catch (err) {
    console.error('Erro ao listar tecnologias:', err)
    alert('Erro ao listar tecnologias.')
  }
}

async function salvar() {
  const modulo: Modulo = {
    uuid: '',
    descricao: descricao.value,
    documentacaoUrl: documentacaoUrl.value,
    url: url.value,
    porta: porta.value ?? 0,
    gitUrl: gitUrl.value,
    armazenamento: armazenamentoSelecionado.value,
    tipoTecnologia: tipoTecnologia.value,
    tecnologiaUuid: tecnologiaSelecionada.value ?? '',
    ativo: true
  }

  emit('save', modulo)
}

function fechar() {
  emit('close')
}

onMounted(() => {
  listarArmazenamentos()
})

onMounted(() => {
  listarTecnologias()
})
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">

      <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">
        Cadastrar Módulo
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div class="flex flex-col p-2">
          <label class="block text-sm font-medium mb-2">Descrição</label>
          <input
            v-model="descricao"
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="flex flex-col p-2">
          <label class="block text-sm font-medium mb-2">Documentação URL</label>
          <input
            v-model="documentacaoUrl"
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex flex-col p-2">
          <label class="block text-sm font-medium mb-2">URL</label>
          <input
            v-model="url"
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex flex-col p-2">
          <label class="block text-sm font-medium mb-2">Porta</label>
          <input
            v-model="porta"
            type="number"
            min="0"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex flex-col p-2">
          <label class="block text-sm font-medium mb-2">Git URL</label>
          <input
            v-model="gitUrl"
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex flex-col p-2">
          <label class="block text-sm font-medium mb-2">Tipo de Tecnologia</label>
          <select
            v-model="tipoTecnologia"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">--Selecione--</option>
            <option value="BACKEND">Backend</option>
            <option value="FRONTEND">Frontend</option>
            <option value="MONOLITO">Monolito</option>
          </select>
        </div>

        <div class="flex flex-col p-2">
          <label class="block text-sm font-medium mb-2">Tecnologia</label>
          <select
            v-model="tecnologiaSelecionada"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option :value="null">--Selecione--</option>
            <option v-for="tec in tecnologias" :key="tec.uuid" :value="tec.uuid">
              {{ tec.descricao }}
            </option>
          </select>
        </div>

        <div class="flex flex-col p-2 md:col-span-2">
          <label class="block text-sm font-medium mb-2">Armazenamentos</label>

          <ArmazenamentoForm 
            v-if="mostrarArmazenamentoForm"
            @save="adicionarArmazenamento"
            @close="mostrarArmazenamentoForm = false"
          />

          <button
              type="button"
              @click="mostrarArmazenamentoForm = true"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Adicionar Armazenamento
            </button>

        <div v-if="armazenamentos.length === 0" class="text-sm text-gray-500 italic">
          Nenhum armazenamento adicionado.
        </div>

        <div v-else class="space-y-3">
          <div v-for="(armazenamento, index) in armazenamentos" :key="index"
            class="flex justify-between items-center border rounded-lg p-4">
            <div>
              <p class="font-medium">{{ armazenamento.schema }}</p>
            </div>

            <button type="button" class="text-red-600 hover:text-red-800">
              Remover
            </button>
          </div>
        </div>
          
        </div>

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
          class="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition"
        >
          Salvar
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { ArmazenamentoService } from '@/services/ArmazenamentoService'
import type { Armazenamento } from '@/types/ArmazenamentoType'
import { BancoDeDadosService } from '@/services/BancoDeDadosService'
import type { BancoDeDados } from '@/types/BancoDeDadosType'

const schema = ref('')
const dblink = ref<boolean | null>(false)
const bancoDeDadosSelecionado = ref<string | null>(null)
const bancosDeDados = ref<BancoDeDados[]>([])

async function listarBancosDeDados(){
  try {
    const { data } = await BancoDeDadosService.listar()
    let itemsArray: BancoDeDados[] = []
    itemsArray = data.dados;
    if (Array.isArray(itemsArray) && itemsArray.length > 0 && Array.isArray(itemsArray[0])) {
      itemsArray = itemsArray.flat()
    }
    bancosDeDados.value = (itemsArray).map((it: BancoDeDados) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      versao: it.versao,
      ip: it.ip,
      porta: it.porta,
      host: it.host,
      ativo: it.ativo,
    }))
  }catch (error) {
    console.error('Erro ao listar bancos de dados:', error)
    alert('Erro ao listar bancos de dados.')
  }
}

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

async function salvar() {
  try {
    //await ArmazenamentoService.salvar({ descricao: descricao.value, versao: versao.value, linguagemUuid: linguagemSelecionada.value })
    emit('save')
    schema.value = ''
    dblink.value = null
    fechar()
  } catch (error) {
    console.error('Erro ao salvar armazenamento:', error)
    alert('Erro ao salvar armazenamento.')
  }
}

function fechar(){
    emit('close')
}

onMounted(() => {
  listarBancosDeDados()
})
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">
          Cadastrar Armazenamento
        </h2>
        <div class="flex flex-col gap-4">
          <label class="block text-sm font-medium text-neutral-700 mb-2">Schema</label>
          <input 
            v-model="schema" 
            type="text" 
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Dblink</label>
          <input 
            v-model="dblink" 
            type="checkbox"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Banco de Dados:</label>
          <select name="linguagens" v-model="bancoDeDadosSelecionado" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option :value="null">--Selecione--</option>
            <option v-for="(banco, index) in bancosDeDados" :key="banco.uuid ?? (banco.descricao + '-' + index)" :value="banco.uuid">{{ banco.descricao }} - {{ banco.versao }}</option>
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
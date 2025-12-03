<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { TecnologiaService } from '@/services/TecnologiaService'
import type { Linguagem } from '@/types/LinguagemType'
import { LinguagemService } from '@/services/LinguagemService'

const descricao = ref('')
const versao = ref('')
const linguagemSelecionada = ref<string | null>(null)
const linguagens = ref<Linguagem[]>([])

async function listarLinguagens(){
  try {
    const { data } = await LinguagemService.listar()
    let itemsArray: Linguagem[] = []
    itemsArray = data.dados;
    if (Array.isArray(itemsArray) && itemsArray.length > 0 && Array.isArray(itemsArray[0])) {
      itemsArray = itemsArray.flat()
    }
    linguagens.value = (itemsArray).map((it: Linguagem) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      versao: it.versao,
      ativo: it.ativo,
    }))
  }catch (error) {
    console.error('Erro ao listar linguagens:', error)
    alert('Erro ao listar linguagens.')
  }
}

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

async function salvar() {
  try {
    await TecnologiaService.salvar({ descricao: descricao.value, versao: versao.value, linguagemUuid: linguagemSelecionada.value })
    emit('save')
    descricao.value = ''
    versao.value = ''
    fechar()
  } catch (error) {
    console.error('Erro ao salvar tecnologia:', error)
    alert('Erro ao salvar tecnologia.')
  }
}

function fechar(){
    emit('close')
}

onMounted(() => {
  listarLinguagens()
})

</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">
          Cadastrar Tecnologia
        </h2>
        <div class="flex flex-col gap-4">
          <label class="block text-sm font-medium text-neutral-700 mb-2">Tecnologia</label>
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

          <label class="block text-sm font-medium text-neutral-700 mb-2">Linguagem:</label>
          <select name="linguagens" v-model="linguagemSelecionada" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option :value="null">--Selecione--</option>
            <option v-for="(ling, index) in linguagens" :key="ling.uuid ?? (ling.descricao + '-' + index)" :value="ling.uuid">{{ ling.descricao }} - {{ ling.versao }}</option>
          </select>
        </div>

        <div class="flex justify-end mt-6 gap-3">
          <button
            @click="fechar"
            class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>

          <button @click="salvar"
            class="px-4 py-2 rounded-lg bg-green-500 hover:bg-gray-400 transition"
          >
            Salvar
          </button>
        </div>  
      </div>
    </div>
</template>

<style scoped></style>
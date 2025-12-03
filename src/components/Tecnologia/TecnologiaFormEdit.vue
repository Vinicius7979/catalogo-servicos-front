<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { TecnologiaService } from '@/services/TecnologiaService';
import { LinguagemService } from '@/services/LinguagemService'
import type { Linguagem } from '@/types/LinguagemType'
import type { Tecnologia } from '@/types/TecnologiaType'

const props = defineProps<{ tecnologia: Tecnologia | null }>()
const linguagens = ref<Linguagem[]>([])
const linguagemSelecionada = ref<string | null>(null)

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

const descricao = ref('')
const versao = ref('')

watch(() => props.tecnologia, (novo) => {
  if (novo) {
    descricao.value = novo.descricao ?? ''
    versao.value = novo.versao ?? ''
    linguagemSelecionada.value = (novo.linguagemUuid as string) ?? null
  } else {
    descricao.value = ''
    versao.value = ''
  }
}, { immediate: true })

async function salvarEdicao() {
  if (!props.tecnologia) return
  try {
    await TecnologiaService.atualizar(props.tecnologia.uuid, { descricao: descricao.value, versao: versao.value, linguagemUuid: linguagemSelecionada.value })
    emit('save')
    emit('close')
  } catch (error) {
    console.error('Erro ao editar tecnologia:', error)
    alert('Erro ao editar a tecnologia.')
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
          Editar Tecnologia
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

          <button 
            @click="salvarEdicao"
            class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Salvar
          </button>
        </div>  
      </div>
    </div>
</template>

<style scoped></style>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { LinguagemService } from '@/services/LinguagemService'
import LinguagemList from '@/components/Linguagens/LinguagemList.vue'
import LinguagemForm from '@/components/Linguagens/LinguagemForm.vue'
import LinguagemFormEdit from '@/components/Linguagens/LinguagemFormEdit.vue'
import ConfirmacaoRemocaoLinguagem from '@/components/Linguagens/ConfirmacaoRemocaoLinguagem.vue'
import type { Linguagem } from '@/types/LinguagemType'

const linguagens = ref<Linguagem[]>([])
const loading = ref(true)
const erro = ref('')
const adicionarForm = ref(false)
const editarForm = ref(false)
const linguagemSelecionada = ref<Linguagem | null>(null)
const mostrarConfirmacaoRemocao = ref(false)
const uuidParaRemover = ref<string | null>(null)

async function carregarLinguagens() {
  try {
    loading.value = true
    erro.value = ''
    const { data } = await LinguagemService.listar()

    let itensArray: Linguagem[] = []
    
    itensArray = data.dados;

    if (Array.isArray(itensArray) && itensArray.length > 0 && Array.isArray(itensArray[0])) {
      itensArray = itensArray.flat()
    }

    linguagens.value = (itensArray).map((it: Linguagem) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      versao: it.versao,
      ativo: it.ativo,
    }));

  } catch (error) {
    console.error('Erro ao carregar linguagens:', error)
    erro.value = 'Erro ao carregar linguagens.'
    linguagens.value = [] // deixa a lista vazia pra evitar dados antigos ou invalidos, coisas do tipo.
  } finally {
    loading.value = false
  }
}

function abrirEditar(ling: Linguagem) {
  linguagemSelecionada.value = ling
  editarForm.value = true
}

function fecharEditar() {
  editarForm.value = false
  linguagemSelecionada.value = null
}

function handleSaveEdit() {
  carregarLinguagens()
  fecharEditar()
}

function abrirConfirmacaoRemocao(uuid: string) {
  uuidParaRemover.value = uuid
  mostrarConfirmacaoRemocao.value = true
}

function cancelarRemocao() {
  mostrarConfirmacaoRemocao.value = false
  uuidParaRemover.value = null
}

async function confirmarRemocao() {
  if (!uuidParaRemover.value) return
  
  try {
    await LinguagemService.deletar(uuidParaRemover.value)
    await carregarLinguagens()
    cancelarRemocao()
  } catch (error) {
    console.error('Erro ao remover linguagem:', error)
    erro.value = 'Erro ao remover linguagem.'
    mostrarConfirmacaoRemocao.value = false
  }
}

onMounted(() => {
  carregarLinguagens()
})
</script>

<template>
  <section class="flex-1 p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-neutral-800 mb-2">Linguagens</h1>
    </div>

    <LinguagemForm 
      v-if="adicionarForm"
      @close="adicionarForm = false"
      @save="carregarLinguagens"
    />

    <LinguagemFormEdit 
      v-if="editarForm"
      :linguagem="linguagemSelecionada"
      @close="fecharEditar"
      @save="handleSaveEdit" 
    />

    <ConfirmacaoRemocaoLinguagem
      v-if="mostrarConfirmacaoRemocao"
      @cancel="cancelarRemocao"
      @confirm="confirmarRemocao"
    />

    <div 
      v-if="erro"
      class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
    >
      {{ erro }}
    </div>

    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-6 border-b border-neutral-200">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-neutral-800">Linguagens Cadastradas</h2>
          <div class="ml-4">
            <button
              @click="adicionarForm = true"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
            
      <div v-if="loading" class="p-6 text-center text-neutral-500">
        <p>Carregando linguagens...</p>
      </div>

      <div v-else class="overflow-x-auto">
          <LinguagemList 
            :linguagens="linguagens"
            @remover="abrirConfirmacaoRemocao"
            @editar="abrirEditar"
          />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TecnologiaService } from '@/services/TecnologiaService';
import type { Tecnologia } from '@/types/TecnologiaType';
import TecnologiaForm from '@/components/Tecnologia/TecnologiaForm.vue';
import TecnologiaFormEdit from '@/components/Tecnologia/TecnologiaFormEdit.vue';
import ConfirmarRemocaoTecnologia from '@/components/Tecnologia/ConfirmarRemocaoTecnologia.vue';
import TecnologiaList from '@/components/Tecnologia/TecnologiaList.vue'

const adicionarForm = ref(false);
const editarForm = ref(false);
const tecnologias = ref<Tecnologia[]>([])
const tecnologiaSelecionada = ref<Tecnologia | null>(null)
const erro = ref('')
const loading = ref(true)
const mostrarConfirmacaoRemocao = ref(false)
const uuidParaRemover = ref<string | null>(null)

async function carregarTecnologias() {
  try {
    loading.value = true
    erro.value = ''
    const { data } = await TecnologiaService.listar()

    let itemsArray: Tecnologia[] = []
    
    itemsArray = data.dados;

    if (Array.isArray(itemsArray) && itemsArray.length > 0 && Array.isArray(itemsArray[0])) {
      itemsArray = itemsArray.flat()
    }

    tecnologias.value = (itemsArray).map((it: Tecnologia) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      versao: it.versao,
      ativo: it.ativo,
      linguagemUuid: it.linguagemUuid,
    }));

  } catch (error) {
    console.error('Erro ao carregar tecnologias:', error)
    erro.value = 'Erro ao carregar tecnologias.'
    tecnologias.value = []
  } finally {
    loading.value = false
  }
}

function abrirEditar(tec: Tecnologia) {
  tecnologiaSelecionada.value = tec
  editarForm.value = true
}

function fecharEditar() {
  editarForm.value = false
  tecnologiaSelecionada.value = null
}

function handleSaveEdit() {
  carregarTecnologias()
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
    await TecnologiaService.deletar(uuidParaRemover.value)
    await carregarTecnologias()
    cancelarRemocao()
  } catch (error) {
    console.error('Erro ao remover tecnologia:', error)
    erro.value = 'Erro ao remover tecnologia.'
    mostrarConfirmacaoRemocao.value = false
  }
}

onMounted(() => {
  carregarTecnologias()
});
</script>

<template>
    <section class="flex-1 p-6">
        <div class="mb-8">
            <h1 class="text-2xl font-semibold text-neutral-800 mb-2">Tecnologias</h1>
        </div>

        <TecnologiaForm
            v-if="adicionarForm"
            @close="adicionarForm = false"
            @save="carregarTecnologias"
        />

        <TecnologiaFormEdit 
            v-if="editarForm"
            :tecnologia="tecnologiaSelecionada"
            @close="fecharEditar"
            @save="handleSaveEdit"
        />

        <ConfirmarRemocaoTecnologia 
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
                    <h2 class="text-lg font-semibold text-neutral-800">Tecnologias Cadastradas</h2>
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
                <p>Carregando tecnologias...</p>
            </div>

            <div v-else class="overflow-x-auto">
                <TecnologiaList
                  :tecnologias="tecnologias"
                  @editar="abrirEditar"
                  @remover="abrirConfirmacaoRemocao"
                />
            </div>
        </div>
    </section>
</template>

<style scoped></style>
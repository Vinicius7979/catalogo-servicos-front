<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AreaDeNegocioService } from '@/services/AreaDeNegocioService'
import AreaDeNegocioList from '@/components/AreaDeNegocio/AreaDeNegocioList.vue'
import AreaDeNegocioForm from '@/components/AreaDeNegocio/AreaDeNegocioForm.vue'
import AreaDeNegocioFormEdit from '@/components/AreaDeNegocio/AreaDeNegocioFormEdit.vue'
import ConfirmacaoRemocaoAreaDeNegocio from '@/components/AreaDeNegocio/ConfirmacaoRemocaoAreaDeNegocio.vue'
import type { AreaDeNegocio } from '@/types/AreaDeNegocioType'

const areasDeNegocio = ref<AreaDeNegocio[]>([])
const loading = ref(true)
const erro = ref('')
const adicionarForm = ref(false)
const editarForm = ref(false)
const areaDeNegocioSelecionada = ref<AreaDeNegocio | null>(null)
const mostrarConfirmacaoRemocao = ref(false)
const uuidParaRemover = ref<string | null>(null)

async function carregarAreasDeNegocio() {
  try {
    loading.value = true
    erro.value = ''
    const { data } = await AreaDeNegocioService.listar()

    let itensArray: AreaDeNegocio[] = []
    
    itensArray = data.dados;

    if (Array.isArray(itensArray) && itensArray.length > 0 && Array.isArray(itensArray[0])) {
      itensArray = itensArray.flat()
    }

    areasDeNegocio.value = (itensArray).map((it: AreaDeNegocio) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      impacto: it.impacto,
      ativo: it.ativo,
    }));

  } catch (error) {
    console.error('Erro ao carregar áreas de negócio:', error)
    erro.value = 'Erro ao carregar áreas de negócio.'
    areasDeNegocio.value = []
  } finally {
    loading.value = false
  }
}

function abrirEditar(area: AreaDeNegocio) {
  areaDeNegocioSelecionada.value = area
  editarForm.value = true
}

function fecharEditar() {
  editarForm.value = false
  areaDeNegocioSelecionada.value = null
}

function handleSaveEdit() {
  carregarAreasDeNegocio()
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
    await AreaDeNegocioService.deletar(uuidParaRemover.value)
    await carregarAreasDeNegocio()
    cancelarRemocao()
  } catch (error) {
    console.error('Erro ao remover áreas de negócio:', error)
    erro.value = 'Erro ao remover áreas de negócio.'
    mostrarConfirmacaoRemocao.value = false
  }
}

onMounted(() => {
  carregarAreasDeNegocio()
})
</script>

<template>
    <section class="flex-1 p-6">
        <div class="mb-8">
            <h1 class="text-2xl font-semibold text-neutral-800 mb-2">Áreas de Negócio</h1>
        </div>

        <AreaDeNegocioForm
            v-if="adicionarForm"
            @close="adicionarForm = false"
            @save="carregarAreasDeNegocio"
        />

        <AreaDeNegocioFormEdit 
            v-if="editarForm"
            :areaDeNegocio="areaDeNegocioSelecionada"
            @close="fecharEditar"
            @save="handleSaveEdit" 
        />

        <ConfirmacaoRemocaoAreaDeNegocio
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
                    <h2 class="text-lg font-semibold text-neutral-800">Áreas de Negócio Cadastradas</h2>
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
                <p>Carregando áreas de negócio...</p>
            </div>

            <div v-else class="overflow-x-auto">
                <AreaDeNegocioList 
                    :areasDeNegocio="areasDeNegocio"
                    @remover="abrirConfirmacaoRemocao"
                    @editar="abrirEditar"
                />
            </div>
        </div>
    </section>
</template>

<style scoped></style>
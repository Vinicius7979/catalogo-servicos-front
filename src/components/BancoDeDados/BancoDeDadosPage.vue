<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { BancoDeDados } from '@/types/BancoDeDadosType.ts';
import { BancoDeDadosService } from '@/services/BancoDeDadosService.ts';
import BancoDeDadosList from '@/components/BancoDeDados/BancoDeDadosList.vue';
import BancoDeDadosForm from '@/components/BancoDeDados/BancoDeDadosForm.vue';
import BancoDeDadosFormEdit from '@/components/BancoDeDados/BancoDeDadosFormEdit.vue';
import ConfirmacaoRemocaoBancoDeDados from '@/components/BancoDeDados/ConfirmacaoRemocaoBancoDeDados.vue';

const bancosDeDados = ref<BancoDeDados[]>([])
const loading = ref(true)
const erro = ref('')
const adicionarForm = ref(false)
const editarForm = ref(false)
const bancoDeDadosSelecionado = ref<BancoDeDados | null>(null)
const mostrarConfirmacaoRemocao = ref(false)
const uuidParaRemover = ref<string | null>(null)

async function carregarBancosDeDados() {
  try {
    loading.value = true
    erro.value = ''
    const { data } = await BancoDeDadosService.listar()

    let itensArray: BancoDeDados[] = []
    
    itensArray = data.dados;

    if (Array.isArray(itensArray) && itensArray.length > 0 && Array.isArray(itensArray[0])) {
      itensArray = itensArray.flat()
    }

    bancosDeDados.value = (itensArray).map((it: BancoDeDados) => ({
      uuid: it.uuid,
      descricao: it.descricao,
      versao: it.versao,
      ip: it.ip,
      porta: it.porta,
      host: it.host,
      ativo: it.ativo,
    }));

  } catch (error) {
    console.error('Erro ao carregar bancos de dados:', error);
    erro.value = 'Erro ao carregar bancos de dados.';
    bancosDeDados.value = [];
  } finally {
    loading.value = false;
  }
}

function abrirEditar(banco: BancoDeDados) {
  bancoDeDadosSelecionado.value = banco;
  editarForm.value = true;
}

function fecharEditar() {
  editarForm.value = false;
  bancoDeDadosSelecionado.value = null;
}

function handleSaveEdit() {
  carregarBancosDeDados()
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
    await BancoDeDadosService.deletar(uuidParaRemover.value)
    await carregarBancosDeDados()
    cancelarRemocao()
  } catch (error) {
    console.error('Erro ao remover banco de dados:', error)
    erro.value = 'Erro ao remover banco de dados.'
    mostrarConfirmacaoRemocao.value = false
  }
}

onMounted(() => {
  carregarBancosDeDados()
})

</script>

<template>
    <section class="flex-1 p-6">
        <div class="mb-8">
            <h1 class="text-2xl font-semibold text-neutral-800 mb-2">Banco de Dados</h1>
        </div>

        <BancoDeDadosForm 
          v-if="adicionarForm"
          @close="adicionarForm = false"
          @save="carregarBancosDeDados"
        />

        <BancoDeDadosFormEdit
          v-if="editarForm"
          :banco-de-dados="bancoDeDadosSelecionado"
          @close="fecharEditar"
          @save="handleSaveEdit"
        />

        <ConfirmacaoRemocaoBancoDeDados 
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
                    <h2 class="text-lg font-semibold text-neutral-800">Bancos de Dados Cadastrados</h2>
                
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
                <p>Carreagando bancos de dados...</p>
            </div>
            
            <div v-else class="overflow-x-auto">
                <BancoDeDadosList 
                  :bancos-de-dados="bancosDeDados"
                  @remover="abrirConfirmacaoRemocao"
                  @editar="abrirEditar"
                />
            </div>
        </div>
    </section>
</template>

<style scoped></style>
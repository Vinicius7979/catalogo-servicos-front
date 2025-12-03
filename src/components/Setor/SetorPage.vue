<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Setor } from '@/types/SetorType';
import { SetorService } from '@/services/SetorService';
import SetorForm from '@/components/Setor/SetorForm.vue';
import SetorFormEdit from '@/components/Setor/SetorFormEdit.vue';
import ConfirmacaoRemocaoSetor from '@/components/Setor/ConfirmacaoRemocaoSetor.vue';
import SetorList from '@/components/Setor/SetorList.vue';

const erro = ref('');
const loading = ref(true);
const setores = ref<Setor[]>([]);
const adicionarForm = ref(false);
const editarForm = ref(false);
const mostrarConfirmacaoRemocao = ref(false);
const uuidParaRemover = ref<string | null>(null);
const setorSelecionado = ref<Setor | null>(null);

async function carregarSetores() {
    try {
        loading.value = true;
        erro.value = '';
        const { data } = await SetorService.listar();

        let itensArray: Setor[] = [];

        itensArray = data.dados;

        if (Array.isArray(itensArray) && itensArray.length > 0 && Array.isArray(itensArray[0])) {
            itensArray = itensArray.flat()
        }

        setores.value = itensArray.map((it: Setor) => ({
            uuid: it.uuid,
            descricao: it.descricao,
            ativo: it.ativo,
        }));

    } catch (error) {
        console.error('Erro ao carregar setores:', error);
        erro.value = 'Erro ao carregar setores.';
        setores.value = [];
    } finally {
        loading.value = false;
    }
}

function abrirEditar(set: Setor) {
    setorSelecionado.value = set;
    editarForm.value = true;
}

function fecharEditar() {
    editarForm.value = false;
    setorSelecionado.value = null;
}

function handleSaveEdit() {
    carregarSetores();
    fecharEditar();
}

function abrirConfirmacaoRemocao(uuid: string) {
  uuidParaRemover.value = uuid;
  mostrarConfirmacaoRemocao.value = true;
}

function cancelarRemocao() {
  mostrarConfirmacaoRemocao.value = false;
  uuidParaRemover.value = null;
}

async function confirmarRemocao(){
    if (!uuidParaRemover.value) return;

    try {
        await SetorService.deletar(uuidParaRemover.value);
        await carregarSetores();
        cancelarRemocao();
    }catch (error) {
        console.error('Erro ao remover setor:', error);
        erro.value = 'Erro ao remover setor.';
        mostrarConfirmacaoRemocao.value = false;
    }
}

onMounted(() => {
    carregarSetores();
});

</script>

<template>
    <section class="flex-1 p-6">
        <div class="mb-8">
            <h1 class="text-2xl font-semibold text-neutral-800 mb-2">Setores</h1>
        </div>

        <SetorForm
            v-if="adicionarForm"
            @close="adicionarForm = false"
            @save="carregarSetores"
        />

        <SetorFormEdit
            v-if="editarForm"
            :setor="setorSelecionado"
            @close="fecharEditar"
            @save="handleSaveEdit"
        />

        <ConfirmacaoRemocaoSetor
            v-if="mostrarConfirmacaoRemocao"
            @confirm="confirmarRemocao"
            @cancel="cancelarRemocao"
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
                    <h2 class="text-lg font-semibold text-neutral-800">Setores Cadastrados</h2>
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
                <p>Carregando setores...</p>
            </div>
            <div v-else class="overflow-x-auto">
                <SetorList
                    :setores="setores"
                    @remover="abrirConfirmacaoRemocao"
                    @editar="abrirEditar"
                />
            </div>
        </div>
    </section>
</template>

<style scoped></style>
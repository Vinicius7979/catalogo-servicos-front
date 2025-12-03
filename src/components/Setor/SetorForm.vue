<script setup lang="ts">
import { SetorService } from '@/services/SetorService';
import { ref } from 'vue';

const descricao = ref('');

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'save'): void;
}>();

async function salvar() {
    try {
        await SetorService.salvar({ descricao: descricao.value });
        emit('save');
        descricao.value = '';
        fechar();
    }catch (error) {
        console.error('Erro ao salvar setor:', error);
        alert('Erro ao salvar setor.');
    }
}

function fechar() {
    emit('close');
}

</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">
            <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">
                Cadastrar Setor
            </h2>
            <div class="flex flex-col gap-4">
                <label class="block text-sm font-medium text-neutral-700 mb-2">Setor</label>
                <input 
                    v-model="descricao"
                    type="text"
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
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
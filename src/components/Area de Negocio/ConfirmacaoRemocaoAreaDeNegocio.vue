<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'confirm'): void
}>()

</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm text-center">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Deseja remover essa Área de Négocio?</h2>
        
            <div class="flex justify-center gap-4">
                <button
                    @click="emit('cancel')"
                    class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                >
                    Cancelar
                </button>

                <button
                    @click="emit('confirm')"
                    class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                    Confirmar
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
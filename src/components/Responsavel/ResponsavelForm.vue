<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Responsavel } from '@/types/ResponsavelType'

const props = defineProps<{
  responsavel?: Responsavel
}>()

const emit = defineEmits<{
  (e: 'save', responsavel: Responsavel): void
  (e: 'close'): void
}>()

const gestor = ref('')
const solicitante = ref('')
const responsavelTecnico = ref('')
const emailGestor = ref('')
const emailSolicitante = ref('')

watch(
  () => props.responsavel,
  (r) => {
    if (!r) return
    gestor.value = r.gestor
    solicitante.value = r.solicitante
    responsavelTecnico.value = r.responsavelTecnico
    emailGestor.value = r.emailGestor
    emailSolicitante.value = r.emailSolicitante
  },
  { immediate: true }
)

function salvar() {
  const responsavel: Responsavel = {
    uuid: props.responsavel?.uuid ?? '',
    gestor: gestor.value,
    solicitante: solicitante.value,
    responsavelTecnico: responsavelTecnico.value,
    emailGestor: emailGestor.value,
    emailSolicitante: emailSolicitante.value,
    ativo: true
  }

  emit('save', responsavel)
}

function fechar() {
  emit('close')
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

  <div class="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-2xl">

    <h2 class="text-xl font-bold mb-4 text-gray-800">
      Editar Responsável
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1">Gestor</label>
        <input v-model="gestor" class="border rounded-lg px-3 py-2"/>
      </div>

      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1">Solicitante</label>
        <input v-model="solicitante" class="border rounded-lg px-3 py-2"/>
      </div>

      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1">Responsável Técnico</label>
        <input v-model="responsavelTecnico" class="border rounded-lg px-3 py-2"/>
      </div>

      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1">Email Gestor</label>
        <input v-model="emailGestor" class="border rounded-lg px-3 py-2"/>
      </div>

      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1">Email Solicitante</label>
        <input v-model="emailSolicitante" class="border rounded-lg px-3 py-2"/>
      </div>

    </div>

    <div class="flex justify-end gap-3 mt-6">

      <button
        @click="fechar"
        class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
      >
        Cancelar
      </button>

      <button
        @click="salvar"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Salvar
      </button>

    </div>

  </div>

</div>
</template>

<style></style>
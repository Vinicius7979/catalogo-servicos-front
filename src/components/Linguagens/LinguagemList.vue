<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  linguagens: { uuid: string; descricao: string; versao: string; ativo: boolean }[]
}>()
</script>

<template>
  <table class="min-w-full divide-y divide-neutral-200">
    <thead class="bg-neutral-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Nome</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Versão</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-neutral-100">
      <tr v-for="(ling, index) in linguagens" :key="ling.uuid ?? (ling.descricao + '-' + index)" class="hover:bg-neutral-50 transition">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">{{ ling.descricao }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ ling.versao }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button 
            @click="$emit('editar', ling)"
            class="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition"
          >
            Editar
          </button>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button 
            @click="$emit('remover', ling.uuid ?? ling.descricao)" 
            class="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition"
          >
            Remover
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  bancosDeDados: { uuid: string; descricao: string; versao: string; ip: string; porta: number; host: string; ativo: boolean; }[]
}>()

</script>

<template>
    <table class="min-w-full divide-y divide-neutral-200">
    <thead class="bg-neutral-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Nome</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Versão</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Ip</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Porta</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Host</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-neutral-100">
      <tr v-for="(banco, index) in bancosDeDados" :key="banco.uuid ?? (banco.descricao + '-' + index)" class="hover:bg-neutral-50 transition">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">{{ banco.descricao }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ banco.versao }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ banco.ip }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ banco.porta }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ banco.host }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button 
            @click="$emit('editar', banco)"
            class="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition"
          >
            Editar
          </button>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button 
            @click="$emit('remover', banco.uuid ?? banco.descricao)" 
            class="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition"
          >
            Remover
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
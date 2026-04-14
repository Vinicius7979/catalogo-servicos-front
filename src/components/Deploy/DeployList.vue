<script setup lang="ts">

defineProps<{
  deploys: { uuid: string; versao: string; hash: string; plataforma: string; tipoPipeline: string; servidorAplicacaoUuid: string; moduloUuid: string; ativo: boolean }[]
}>()

</script>

<template>
    <table class="min-w-full divide-y divide-neutral-200">
    <thead class="bg-neutral-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Versão</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Plataforma</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Tipo de Pipeline</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-neutral-100">
      <tr v-for="(dep, index) in deploys" :key="dep.uuid ?? (dep.versao + '-' + index)" class="hover:bg-neutral-50 transition">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">{{ dep.versao }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ dep.plataforma }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ dep.tipoPipeline }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button 
            @click="$emit('editar', dep)"
            class="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition"
          >
            Editar
          </button>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button 
            @click="$emit('remover', dep.uuid ?? dep.versao)" 
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
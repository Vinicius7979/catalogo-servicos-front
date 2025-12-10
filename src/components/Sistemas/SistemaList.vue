<script setup lang="ts">

defineProps<{
  sistemas: { uuid: string;
    descricao: string;
    versao: string;
    sigla: string;
    url: string;
    status: string; // enum
    autenticacao: string; // enum
    segmentoUuid: string;
    setorUuid: string;
    areaDeNegocioUuid: string;
    // responsavel: Responsavel; // objeto
    ativo: boolean; }[]
}>()
</script>

<template>
    <table class="min-w-full divide-y divide-neutral-200">
    <thead class="bg-neutral-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Nome</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Versão</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Sigla</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Url</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Autenticação</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-neutral-100">
      <tr v-for="(sis, index) in sistemas" :key="sis.uuid ?? (sis.descricao + '-' + index)" class="hover:bg-neutral-50 transition">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">{{ sis.descricao }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ sis.versao }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ sis.sigla }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ sis.url }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ sis.status }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ sis.autenticacao }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button 
            @click="$emit('editar', sis)"
            class="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition"
          >
            Editar
          </button>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button 
            @click="$emit('remover', sis.uuid ?? sis.descricao)" 
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
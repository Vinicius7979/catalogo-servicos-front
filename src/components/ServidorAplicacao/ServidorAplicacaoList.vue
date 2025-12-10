<script setup lang="ts">
defineProps<{
  servidoresAplicacao: { uuid: string;
    descricao: string;
    versao: string;
    ip: string;
    ambiente: string;
    tipoServidor: string;
    orquestrador: string;
    url: string;
    porta: number;
    ipProxy: string;
    hostName: string;
    distribuicao: string;
    ativo: boolean; }[]
}>()
</script>

<template>
    <table class="min-w-full divide-y divide-neutral-200">
    <thead class="bg-neutral-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Nome</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Versão</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Ip</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Ambiente</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Tipo Servidor</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Orquestrador</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Url</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Porta</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Ip Proxy</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">HostName</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Distribuição</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-neutral-100">
      <tr v-for="(serv, index) in servidoresAplicacao" :key="serv.uuid ?? (serv.descricao + '-' + index)" class="hover:bg-neutral-50 transition">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">{{ serv.descricao }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ serv.versao }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ serv.ip }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ serv.ambiente }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ serv.tipoServidor }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ serv.orquestrador }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ serv.url }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ serv.porta }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ serv.ipProxy }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ serv.hostName }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ serv.distribuicao }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button 
            @click="$emit('editar', serv)"
            class="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition"
          >
            Editar
          </button>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <button 
            @click="$emit('remover', serv.uuid ?? serv.descricao)" 
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
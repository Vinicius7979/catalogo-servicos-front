<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ServidorAplicacao } from '@/types/ServidorAplicacaoType'
import { ServidorAplicacaoService } from '@/services/ServidorAplicacaoService'

const props = defineProps<{ servidorAplicacao: ServidorAplicacao | null }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const descricao = ref('')
const versao = ref('')
const ip = ref('')
const ambiente = ref('')
const tipoServidor = ref('')
const orquestrador = ref('')
const url = ref('')
const porta = ref<number | null>(null)
const ipProxy = ref('')
const hostName = ref('')
const distribuicao = ref('')

watch(() => props.servidorAplicacao, (novo) => {
  if (novo) {
    descricao.value = novo.descricao ?? ''
    versao.value = novo.versao ?? ''
    ip.value = novo.ip ?? ''
    ambiente.value = novo.ambiente ?? ''
    tipoServidor.value = novo.tipoServidor ?? ''
    orquestrador.value = novo.orquestrador ?? ''
    url.value = novo.url ?? ''
    porta.value = novo.porta ?? ''
    ipProxy.value = novo.ipProxy ?? ''
    hostName.value = novo.hostName ?? ''
    distribuicao.value = novo.distribuicao ?? ''
  } else {
    descricao.value = ''
    versao.value = ''
    ip.value = ''
    ambiente.value = ''
    tipoServidor.value = ''
    orquestrador.value = ''
    url.value = ''
    porta.value = null
    ipProxy.value = ''
    hostName.value = ''
    distribuicao.value = ''
  }
}, { immediate: true })

async function salvarEdicao() {
  if (!props.servidorAplicacao) return
  try {
    await ServidorAplicacaoService.atualizar(props.servidorAplicacao.uuid, { descricao: descricao.value, versao: versao.value, ip: ip.value, ambiente: ambiente.value, tipoServidor: tipoServidor.value, orquestrador: orquestrador.value, url: url.value, porta: porta.value, ipProxy: ipProxy.value, hostName: hostName.value, distribuicao: distribuicao.value })
    emit('save')
    emit('close')
  } catch (error) {
    console.error('Erro ao editar servidor aplicação:', error)
    alert('Erro ao editar a servidor aplicação.')
  }
}

function fechar(){
  emit('close')
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">
          Editar Servidor Aplicação
        </h2>
        <div class="flex flex-col gap-4">
          <label class="block text-sm font-medium text-neutral-700 mb-2">Servidor Aplicação</label>
          <input 
            v-model="descricao" 
            type="text" 
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Versão</label>
          <input 
            v-model="versao" 
            type="text" 
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
          <label class="block text-sm font-medium text-neutral-700 mb-2">Ip</label>
          <input 
            v-model="ip" 
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Ambiente</label>
                <select 
                    v-model="ambiente" 
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required
                >
                    <option disabled value="">--Selecione--</option>
                    <option value="DESENVOLVIMENTO">Desenvolvimento</option>
                    <option value="HOMOLOGACAO">Homologação</option>
                    <option value="TESTE">Teste</option>
                    <option value="PRODUCAO">Produção</option>
                </select> 
          
          <label class="block text-sm font-medium text-neutral-700 mb-2">Tipo Servidor</label>
                <select 
                    v-model="tipoServidor" 
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required
                >
                    <option disabled value="">--Selecione--</option>
                    <option value="TOMCAT">Tomcat</option>
                    <option value="IIS">IIS</option>
                    <option value="NGIX">NGIX</option>
                    <option value="JBOSS">JBoss</option>
                </select>

          <label class="block text-sm font-medium text-neutral-700 mb-2">Orquestrador</label>
          <input 
            v-model="orquestrador" 
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Url</label>
          <input 
            v-model="url" 
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Porta</label>
            <input 
                v-model="porta" 
                type="number" 
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
            />

        <label class="block text-sm font-medium text-neutral-700 mb-2">IpProxy</label>
          <input 
            v-model="ipProxy" 
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">HostName</label>
          <input 
            v-model="hostName" 
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />

          <label class="block text-sm font-medium text-neutral-700 mb-2">Distribuicao</label>
          <input 
            v-model="distribuicao" 
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
            @click="salvarEdicao"
            class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Salvar
          </button>
        </div>  
      </div>
    </div>
</template>

<style scoped></style>
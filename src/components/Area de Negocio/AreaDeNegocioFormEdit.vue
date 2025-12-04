<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AreaDeNegocio } from '@/types/AreaDeNegocioType'
import { AreaDeNegocioService } from '@/services/AreaDeNegocioService'

const props = defineProps<{ areaDeNegocio: AreaDeNegocio | null }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const descricao = ref('')
const versao = ref('')

watch(() => props.areaDeNegocio, (novo) => {
  if (novo) {
    descricao.value = novo.descricao ?? ''
    impacto.value = novo.impacto ?? ''
  } else {
    descricao.value = ''
    versao.value = ''
  }
}, { immediate: true })

async function salvarEdicao() {
  if (!props.areaDeNegocio) return
  try {
    await AreaDeNegocioService.atualizar(props.areaDeNegocio.uuid, { descricao: descricao.value, impacto: impacto.value })
    emit('save')
    emit('close')
  } catch (error) {
    console.error('Erro ao editar área de négocio:', error)
    alert('Erro ao editar a área de négocio.')
  }
}

function fechar(){
  emit('close')
}
</script>

<template></template>

<style scoped></style>
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Segmento } from '@/types/SegmentoType'
import { SegmentoService } from '@/services/SegmentoService'

const props = defineProps<{ segmento: Segmento | null }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const descricao = ref('')
const versao = ref('')

watch(() => props.segmento, (novo) => {
  if (novo) {
    descricao.value = novo.descricao ?? ''
  } else {
    descricao.value = ''
  }
}, { immediate: true })

async function salvarEdicao() {
  if (!props.segmento) return
  try {
    await SegmentoService.atualizar(props.segmento.uuid, { descricao: descricao.value })
    emit('save')
    emit('close')
  } catch (error) {
    console.error('Erro ao editar segmento:', error)
    alert('Erro ao editar a segmento.')
  }
}

function fechar(){
  emit('close')
}
</script>

<template></template>

<style scoped></style>
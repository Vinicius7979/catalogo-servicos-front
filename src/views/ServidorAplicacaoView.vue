<script setup lang="ts">
import BarraLateral from '@/components/BarraLateral.vue';
import ServidorAplicacaoPage from '@/components/ServidorAplicacao/ServidorAplicacaoPage.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

</script>

<template>
    <DefaultLayout>
        <div class="flex min-h-[calc(100vh-120px)]">
            <BarraLateral />
            <ServidorAplicacaoPage />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>
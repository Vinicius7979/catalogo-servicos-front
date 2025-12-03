<script setup lang="ts">
import BancoDeDadosPage from '@/components/BancoDeDados/BancoDeDadosPage.vue';
import BarraLateral from '@/components/BarraLateral.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

</script>

<template>
    <DefaultLayout>
        <div class="flex min-h-[calc(100vh-120px)]">
            <BarraLateral />
            <BancoDeDadosPage />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>
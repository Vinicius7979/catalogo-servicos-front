<script setup lang="ts">
import BarraLateral from '@/components/BarraLateral.vue';
import TecnologiaPage from '@/components/Tecnologia/TecnologiaPage.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

</script>

<template>
    <DefaultLayout>
        <div class="flex min-h-[calc(100vh-120px)]">
            <BarraLateral />
            <TecnologiaPage />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>
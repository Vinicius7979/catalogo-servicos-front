<script setup lang="ts">
import BarraLateral from '@/components/BarraLateral.vue';
import SegmentoPage from '@/components/Segmento/SegmentoPage.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

</script>

<template>
    <DefaultLayout>
        <div class="flex min-h-[calc(100vh-120px)]">
            <BarraLateral />
            <SegmentoPage />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>
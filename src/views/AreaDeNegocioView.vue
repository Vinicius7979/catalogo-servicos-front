<script setup lang="ts">
import AreaDeNegocioPage from '@/components/Area de Negocio/AreaDeNegocioPage.vue';
import BarraLateral from '@/components/BarraLateral.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

</script>

<template>
    <DefaultLayout>
        <div class="flex min-h-[calc(100vh-120px)]">
            <BarraLateral />
            <AreaDeNegocioPage />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>
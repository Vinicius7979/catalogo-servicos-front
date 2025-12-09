<script setup lang="ts">
import type BarraLateral from '@/components/BarraLateral.vue';
import type DeployPage from '@/components/Deploy/DeployPage.vue';
import type DefaultLayout from '@/layouts/DefaultLayout.vue';

</script>

<template>
    <DefaultLayout>
        <div class="flex min-h-[calc(100vh-120px)]">
            <BarraLateral />
            <DeployPage />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>
<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <aside class="w-[220px] bg-white border-r border-neutral-500 py-8 flex flex-col items-start">
        <nav class="w-full">
            <RouterLink to="/linguagem" class="px-6 py-3 w-full text-black no-underline block rounded-[6px] mb-2 transition-colors duration-200 hover:bg-neutral-400">Linguagem</RouterLink>
            <RouterLink to="/tecnologia" class="px-6 py-3 w-full text-black no-underline block rounded-[6px] mb-2 transition-colors duration-200 hover:bg-neutral-400">Tecnologia</RouterLink>
            <RouterLink to="/setor" class="px-6 py-3 w-full text-black no-underline block rounded-[6px] mb-2 transition-colors duration-200 hover:bg-neutral-400">Setor</RouterLink>
            <RouterLink to="/banco-de-dados" class="px-6 py-3 w-full text-black no-underline block rounded-[6px] mb-2 transition-colors duration-200 hover:bg-neutral-400">Banco de Dados</RouterLink>
            <RouterLink to="/servidor-aplicacao" class="px-6 py-3 w-full text-black no-underline block rounded-[6px] mb-2 transition-colors duration-200 hover:bg-neutral-400">Servidor Aplicação</RouterLink>
            <RouterLink to="/area-de-negocio" class="px-6 py-3 w-full text-black no-underline block rounded-[6px] mb-2 transition-colors duration-200 hover:bg-neutral-400">Área de Negócio</RouterLink>
            <RouterLink to="/segmento" class="px-6 py-3 w-full text-black no-underline block rounded-[6px] mb-2 transition-colors duration-200 hover:bg-neutral-400">Segmento</RouterLink>
            <RouterLink to="#" class="px-6 py-3 w-full text-black no-underline block rounded-[6px] mb-2 transition-colors duration-200 hover:bg-neutral-400">Deploy</RouterLink>
            <RouterLink to="/sistema" class="px-6 py-3 w-full text-black no-underline block rounded-[6px] mb-2 transition-colors duration-200 hover:bg-neutral-400">Sistema</RouterLink>
            <RouterLink to="#" class="px-6 py-3 w-full text-black no-underline block rounded-[6px] mb-2 transition-colors duration-200 hover:bg-neutral-400">Serviço</RouterLink>
        </nav>
    </aside>
</template>

<style scoped></style>
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: "/linguagem",
        name: "linguagem",
        component: () => import('@/views/LinguagemView.vue')
    },
    {
        path: "/tecnologia",
        name: "tecnologia",
        component: () => import('@/views/TecnologiaView.vue')
    },
    {
        path: "/setor",
        name: "setor",
        component: () => import('@/views/SetorView.vue')
    },
    {
        path: "/banco-de-dados",
        name: "banco-de-dados",
        component: () => import('@/views/BancoDeDadosView.vue')
    },
    {
        path: "/area-de-negocio",
        name: "area-de-negocio",
        component: () => import('@/views/AreaDeNegocioView.vue')
    },
    {
        path: "/segmento",
        name: "segmento",
        component: () => import('@/views/SegmentoView.vue')
    },
    {
        path: "/servidor-aplicacao",
        name: "servidor-aplicacao",
        component: () => import('@/views/ServidorAplicacaoView.vue')
    },
    {
        path: "/sistema",
        name: "sistema",
        component: () => import('@/views/SistemaView.vue')
    },
    {
        path: "/deploy",
        name: "deploy",
        component: () => import('@/views/DeployView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
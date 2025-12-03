/// <reference types="vite/client" />

// Declaração global para arquivos .vue (evita erro: "não é possível localizar o módulo '*.vue'")
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

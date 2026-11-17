// Diz ao TypeScript quais variáveis de ambiente o projeto usa (arquivo .env)
interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_IA_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
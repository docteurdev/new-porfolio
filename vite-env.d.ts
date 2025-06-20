interface ImportMetaEnv {
  readonly VITE_APP_EMAIL_SERVER: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
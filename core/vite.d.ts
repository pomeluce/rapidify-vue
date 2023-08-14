/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_ENV: string;
  VITE_API_URL: string;
  VITE_MOCK_ENABLE: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV_MODE: "DEVELOPMENT" | "PRODUCTION" | "STAGING";
  // NOTE: 다른 환경 변수들에 대한 타입 정의...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

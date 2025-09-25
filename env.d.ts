/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_OTHER_VAR?: string;
    // 你可以在這裡加其他 env
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

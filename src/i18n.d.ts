// src/i18n.d.ts
import 'vue-i18n'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: (key: string) => string;
    }
}

<script lang="ts" setup>
const { $i18n } = useNuxtApp()
const locales = $i18n.locales.value
const locale = toRef($i18n.locale.value)
</script>

<template>
  <USelectMenu
    v-model="locale" class="w-40 h-8" :items="locales" value-key="code" highlight label-key="name"
    :search-input="false" icon="i-heroicons-language" data-testid="bases-select-locale-menu"
  >
    <template #item="{ item }">
      <SwitchLocalePathLink :locale="item.code" :data-testid="`bases-select-locale-option-${item.code}`">
        {{ item.name }}
      </SwitchLocalePathLink>
    </template>
  </USelectMenu>
</template>

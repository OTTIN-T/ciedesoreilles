<script lang="ts" setup>
const { $i18n } = useNuxtApp()
const locales = $i18n.locales.value
const locale = toRef($i18n.locale.value)

type LocaleCode = 'fr' | 'en'

const flags: Record<LocaleCode, string> = {
  fr: 'i-flag-fr-4x3',
  en: 'i-flag-gb-4x3',
}
const items = computed(() => locales.map(locale => ({
  code: locale.code,
  name: locale.name,
  icon: flags[locale.code],
})))
</script>

<template>
  <USelectMenu
    v-model="locale" :items="items" value-key="code" highlight label-key="name" :search-input="false"
    data-testid="bases-select-locale-menu"
  >
    <template #default="{ modelValue }">
      <UIcon v-if="modelValue" :name="flags[modelValue]" />
    </template>
    <template #item="{ item }">
      <SwitchLocalePathLink :locale="item.code" :data-testid="`bases-select-locale-option-${item.code}`">
        <UIcon :name="item.icon" />
      </SwitchLocalePathLink>
    </template>
  </USelectMenu>
</template>

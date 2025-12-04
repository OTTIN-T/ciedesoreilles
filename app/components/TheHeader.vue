<script setup lang="ts">
const isMenuOpen = ref(false)
const { t } = useI18n({ useScope: 'global' })

const links = computed(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.shows'), to: '/shows' },
  { label: t('nav.company'), to: '/company' },
  { label: t('nav.news'), to: '/news' },
  { label: t('nav.contact'), to: '/contact' },
])
</script>

<template>
  <header class="backdrop-blur-sm text-primary-50 border-b border-primary-800 sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-xl  font-bold text-primary-100 hover:text-primary-300 transition-colors">
        <div class="flex items-center gap-3">
          <NuxtImg src="/logo.png" width="40" height="40" class="bg-primary-500 rounded" alt="Logo" />
          <span>La Cie des Oreilles</span>
        </div>
      </NuxtLink>

      <nav class="hidden md:flex gap-8 items-center">
        <NuxtLink
          v-for="link in links" :key="link.to" :to="link.to"
          class=" text-sm uppercase tracking-wider hover:text-primary-300 transition-colors"
          active-class="text-primary-500 font-bold"
        >
          {{ link.label }}
        </NuxtLink>
        <LanguageSwitcher />
      </nav>

      <div class="md:hidden flex items-center gap-4">
        <UButton
          icon="i-heroicons-bars-3" color="primary" variant="ghost" class="text-primary-50"
          @click="isMenuOpen = !isMenuOpen"
        />
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden border-t border-primary-800">
      <nav class="flex flex-col p-4 gap-4">
        <NuxtLink
          v-for="link in links" :key="link.to" :to="link.to"
          class=" text-lg text-primary-50 hover:text-primary-300" active-class="text-primary-500"
          @click="isMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <LanguageSwitcher />
      </nav>
    </div>
  </header>
</template>

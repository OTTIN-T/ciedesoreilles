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
  <header class="bgprimary950/90 backdrop-blur-sm textprimary50 border-b borderprimary800 sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-serif font-bold textprimary100 hover:textprimary300 transition-colors">
        <div class="flex items-center gap-3">
          <NuxtImg src="/logo.png" width="40" height="40" class="" />
          <span>La Cie des Oreilles</span>
        </div>
      </NuxtLink>

      <nav class="hidden md:flex gap-8 items-center">
        <NuxtLink
          v-for="link in links" :key="link.to" :to="link.to"
          class="font-sans text-sm uppercase tracking-wider hover:textprimary300 transition-colors"
          active-class="textprimary500 font-bold"
        >
          {{ link.label }}
        </NuxtLink>
        <UButton to="/billetterie" color="primary" variant="solid" class="font-bold">
          {{ $t('nav.tickets') }}
        </UButton>
        <LanguageSwitcher />
      </nav>

      <div class="md:hidden flex items-center gap-4">
        <UButton
          icon="i-heroicons-bars-3" color="primary" variant="ghost" class="textprimary50"
          @click="isMenuOpen = !isMenuOpen"
        />
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bgprimary900 border-t borderprimary800">
      <nav class="flex flex-col p-4 gap-4">
        <NuxtLink
          v-for="link in links" :key="link.to" :to="link.to"
          class="font-sans text-lg textprimary50 hover:textprimary300" active-class="textprimary500"
          @click="isMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <UButton to="/billetterie" color="primary" variant="solid" block @click="isMenuOpen = false">
          {{ $t('nav.tickets') }}
        </UButton>
        <LanguageSwitcher />
      </nav>
    </div>
  </header>
</template>

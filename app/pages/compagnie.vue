<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.company.title'),
  description: () => t('seo.company.description'),
  ogTitle: () => `${t('seo.company.title')} - Cie des Oreilles`,
  ogDescription: () => t('seo.company.description'),
  ogImage: '/og-image.png',
})
</script>

<template>
  <div>
    <div class="bgprimary900 text-primary-50 py-12">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-serif font-bold mb-4">
          {{ $t('company.title') }}
        </h1>
        <p class="text-xl text-primary-200 italic">
          {{ $t('company.subtitle') }}
        </p>
      </div>
    </div>

    <AboutSection />

    <section class="py-12 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-serif font-bold text-primary-800 mb-6 text-center">
          {{ $t('company.history_title') }}
        </h2>
        <div class="prose prose-lg prose-stone mx-auto font-body text-primary-700">
          <p>{{ $t('company.history_p1') }}</p>
          <p>{{ $t('company.history_p2') }}</p>
          <p>{{ $t('company.history_p3') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({
  layout: 'default',
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.shows.title'),
  description: () => t('seo.shows.description'),
  ogTitle: () => `${t('seo.shows.title')} - Cie des Oreilles`,
  ogDescription: () => t('seo.shows.description'),
  ogImage: '/og-image.png',
})

const client = useSupabaseClient<Database>()

const { data: shows, pending, error } = await useAsyncData('shows', async () => {
  const { data } = await client
    .from('shows')
    .select('*')
    .order('title')
  return data
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-serif font-bold text-primary-800 mb-8 text-center">
      {{ $t('shows.title') }}
    </h1>

    <div v-if="pending" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-primary-600" />
    </div>

    <div v-else-if="error" class="text-center text-red-600 py-12">
      {{ $t('shows.error') }}
    </div>

    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ShowCard v-for="show in shows" :key="show.id" :show="show" />
    </div>

    <div v-if="!pending && shows?.length === 0" class="text-center text-primary-600 py-12">
      {{ $t('shows.empty') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({
  layout: 'default',
})

const client = useSupabaseClient<Database>()
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.shows.title'),
  description: () => t('seo.shows.description'),
  ogTitle: () => `${t('seo.shows.title')} - Cie des Oreilles`,
  ogDescription: () => t('seo.shows.description'),
})

const activeFilter = ref('all')

const filters = computed(() => [
  { label: t('shows.filter.all'), value: 'all' },
  { label: t('shows.filter.touring'), value: 'touring' },
  { label: t('shows.filter.past'), value: 'past' },
])

const { data: shows } = await useAsyncData('all-shows', async () => {
  const { data } = await client
    .from('shows')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
})

const filteredShows = computed(() => {
  if (activeFilter.value === 'all')
    return shows.value
  // Mock logic for filtering since we don't have touring flag
  // In real app, check agenda or status column
  if (activeFilter.value === 'touring')
    return shows.value?.slice(0, 2) // Mock: first 2 are touring
  if (activeFilter.value === 'past')
    return shows.value?.slice(2) // Mock: rest are past
  return shows.value
})
</script>

<template>
  <div class="py-12 bgprimary950 min-h-screen textprimary50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-6xl font-serif font-bold textprimary100 mb-4">
          {{ $t('shows.title') }}
        </h1>
        <p class="text-xl textprimary300 font-sans max-w-2xl mx-auto">
          {{ $t('shows.subtitle') }}
        </p>
      </div>

      <!-- Filters -->
      <div class="flex justify-center gap-4 mb-12">
        <UButton
          v-for="filter in filters" :key="filter.value"
          :color="activeFilter === filter.value ? 'primary' : 'neutral'"
          :variant="activeFilter === filter.value ? 'solid' : 'outline'" class="font-bold rounded-full px-6"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </UButton>
      </div>

      <!-- Shows Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ShowCard v-for="show in filteredShows" :key="show.id" :show="show" />
      </div>
    </div>
  </div>
</template>

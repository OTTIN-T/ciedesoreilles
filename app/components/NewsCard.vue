<script setup lang="ts">
import type { Database } from '~/types/database.types'

defineProps<{
  news: Database['public']['Tables']['news']['Row']
}>()
</script>

<template>
  <UCard
    class="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 borderprimary800 bgprimary900 ring-1 ringprimary800"
  >
    <template #header>
      <div class="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
        <NuxtImg
          :src="news.image_url || 'https://placehold.co/600x400/2c1810/d4af37?text=News'" :alt="news.title"
          class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <h3 class="text-xl font-serif font-bold textprimary100 line-clamp-2">
        {{ news.title }}
      </h3>
    </template>

    <p class="textprimary200 line-clamp-3 text-sm font-sans">
      {{ news.content }}
    </p>

    <template #footer>
      <div class="flex justify-between items-center mt-auto">
        <span class="text-xs textprimary400 uppercase tracking-wider">
          {{ new Date(news.created_at).toLocaleDateString('fr-FR') }}
        </span>
        <UButton
          :to="`/news/${news.id}`" variant="link" color="primary"
          class="textprimary300 hover:textprimary100 font-bold p-0"
        >
          {{ $t('news.read_more') }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>

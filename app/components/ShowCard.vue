<script setup lang="ts">
import type { Database } from '~/types/database.types'

defineProps<{
  show: Database['public']['Tables']['shows']['Row']
}>()
</script>

<template>
  <div class="group relative overflow-hidden rounded-lg shadow-xl border borderprimary800 bgprimary900">
    <NuxtImg
      :src="show.image_url || 'https://placehold.co/600x800/2c1810/d4af37?text=Show'" :alt="show.title"
      class="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div
      class="absolute inset-0 bg-linear-to-t fromprimary950 viaprimary950/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
    >
      <h3
        class="text-2xl font-serif font-bold textprimary100 mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
      >
        {{ show.title }}
      </h3>
      <p
        class="textprimary200 line-clamp-2 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 font-sans"
      >
        {{ show.description }}
      </p>
      <UButton
        :to="`/shows/${show.slug}`" color="primary" variant="solid"
        class="self-start transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 font-bold"
      >
        {{ $t('shows.discover') }}
      </UButton>
    </div>
  </div>
</template>

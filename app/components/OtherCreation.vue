<script setup lang="ts">
import type { Database } from '~/types/database.types'

defineProps<{
  shows: Database['public']['Tables']['shows']['Row'][]
}>()
</script>

<template>
  <section class="py-20 ">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-2 text-center">
        {{ $t('home.other_creations_title')
        }}
      </h2>
      <p class="text-primary-200 text-center mb-12  ">
        {{ $t('home.other_creations_subtitle') }}
      </p>

      <LazyUCarousel
        v-slot="{ item }" :items="shows"
        :ui="{ item: 'basis-auto transition-opacity [&:not(.is-snapped)]:opacity-10' }" class-names
        :autoplay="{ delay: 2000 }" arrows class="w-2/3 mx-auto"
      >
        <div class="p-4 w-full">
          <ShowCard :show="item" />
        </div>
      </LazyUCarousel>
    </div>
  </section>
</template>

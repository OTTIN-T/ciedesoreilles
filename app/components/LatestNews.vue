<script setup lang="ts">
import type { Database } from '~/types/database.types'

defineProps<{
  news: Database['public']['Tables']['news']['Row'][]
}>()
</script>

<template>
  <section class="py-20 border-t border-primary-800">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-2">
        {{ $t('home.latest_news_title') }}
      </h2>
      <p class="text-primary-100 text-center mb-12  ">
        {{ $t('home.latest_news_subtitle') }}
      </p>

      <UBlogPosts v-if="news?.length" :posts="news" class="text-left">
        <NewsCard v-for="(item, index) in news" :key="item.id" v-bind="item" :news="item" :is-latest="index === 0" />
      </UBlogPosts>
      <p v-else class="text-primary-400 italic mb-8">
        {{ $t('home.no_news') }}
      </p>

      <div class="mt-8">
        <UButton
          to="/news" variant="link" color="primary" class=" hover:text-primary-100 font-bold"
          trailing-icon="i-heroicons-arrow-right"
        >
          {{ $t('home.all_news') }}
        </UButton>
      </div>
    </div>
  </section>
</template>

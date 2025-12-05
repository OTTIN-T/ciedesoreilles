<script setup lang="ts">
import type { Database } from '~/types/database.types';

const props = defineProps<{
  news: Database['public']['Tables']['news']['Row']
  isLatest?: boolean
}>()

const { t } = useI18n()

const badge = computed(() => {
  const isRecent = (new Date().getTime() - new Date(props.news.created_at).getTime()) / (1000 * 3600 * 24) < 10

  if (props.isLatest && isRecent) {
    return {
      label: t('common.new'),
      color: 'primary' as const,
    }
  }
  return undefined
})
</script>

<template>
  <UBlogPost variant="subtle" :to="`/news/${news.id}`" :badge="badge" :ui="{
    description: 'pb-6',
  }"
    class="hover:scale-105 hover:shadow-lg hover:ring-primary-400 transition-all duration-300 bg-bg ring-1 ring-primary-800"
    :date="news.created_at">
    <template #header>
      <NuxtImg :src="news.image_url || 'https://placehold.co/600x400/2c1810/d4af37?text=News'" :alt="news.title"
        class="w-full h-full object-cover" />
    </template>
    <template #title>
      <span class="text-xl font-bold text-primary-100 ">
        {{ news.title }}
      </span>
    </template>
    <template #description>
      <p class="text-md line-clamp-4">
        {{ news.content }}
      </p>
    </template>
    <template #footer>
      <UButton :to="`/news/${news.id}`" variant="link" color="primary"
        class="text-primary-300 hover:text-primary-100 font-bold pl-6 pb-5" trailing-icon="i-heroicons-arrow-right">
        {{ $t('news.read_more') }}
      </UButton>
    </template>
  </UBlogPost>
</template>

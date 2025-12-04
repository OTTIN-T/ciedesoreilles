<script setup lang="ts">
import type { Database } from '~/types/database.types'

const props = defineProps<{
  show: Database['public']['Tables']['shows']['Row']
}>()
const { t } = useI18n()

const badge = computed(() => {
  if (props.show.featured) {
    return {
      label: t('show.featured'),
      color: 'primary' as const,
    }
  }

  return {
    label: props.show.audience || t('show.audience_value'),
    color: 'secondary' as const,
  }
})
</script>

<template>
  <UBlogPost
    variant="subtle" :to="`/shows/${show.slug}`" :badge="badge" :ui="{
      description: 'h-40 pb-6',
    }"
    class="w-96 hover:scale-105 hover:shadow-lg  hover:ring-primary-400 transition-all duration-300 bg-bg ring-1 ring-primary-800 "
  >
    <template #header>
      <NuxtImg
        :src="show.image_url || 'https://placehold.co/600x400/2c1810/d4af37?text=News'" :alt="show.title"
        class="w-full h-full object-cover" quality="80"
      />
      {{ show.featured }}
    </template>
    <template #title>
      <span class="text-xl font-bold text-primary-100 ">
        {{ show.title }}
      </span>
    </template>
    <template #description>
      <p class="text-md line-clamp-4">
        {{ show.description }}
      </p>
    </template>
    <template #footer>
      <UButton
        :to="`/shows/${show.slug}`" variant="link" color="primary"
        class="text-primary-300 hover:text-primary-100 font-bold pl-6 pb-5" trailing-icon="i-heroicons-arrow-right"
      >
        {{ $t('shows.discover') }}
      </UButton>
    </template>
  </UBlogPost>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'

const route = useRoute()
const client = useSupabaseClient<Database>()
const { locale } = useI18n({ useScope: 'global' })

const { data: news, pending, error } = await useAsyncData(`news-${route.params.id}`, async () => {
  const { data } = await client
    .from('news')
    .select('*')
    .eq('id', Number.parseInt(route.params.id as string))
    .single()
  return data
})

useSeoMeta({
  title: () => news.value?.title,
  description: () => news.value?.content?.substring(0, 160),
  ogTitle: () => news.value?.title,
  ogDescription: () => news.value?.content?.substring(0, 160),
  ogImage: () => news.value?.image_url || '/og-image.png',
})
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div v-if="pending" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-primary-600" />
    </div>

    <div v-else-if="error || !news" class="text-center py-12">
      <p class="text-red-600 mb-4">
        {{ $t('news.error') }}
      </p>
      <UButton to="/news" color="neutral" variant="ghost">
        {{ $t('news.back') }}
      </UButton>
    </div>

    <article v-else class="bg-white rounded-lg shadow-xl overflow-hidden border borderprimary200">
      <div v-if="news.image_url" class="h-64 md:h-96 w-full overflow-hidden">
        <NuxtImg :src="news.image_url" :alt="news.title" class="w-full h-full object-cover" />
      </div>

      <div class="p-8">
        <div class="flex items-center gap-4 text-sm text-primary-500 mb-6">
          <NuxtLink to="/news" class="hover:text-primary-700">
            &larr; {{ $t('news.back') }}
          </NuxtLink>
          <span>•</span>
          <span>{{ new Date(news.created_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', {
            dateStyle: 'long',
          }) }}</span>
        </div>

        <h1 class="text-3xl md:text-5xl  font-bold text-primary-900 mb-8">
          {{ news.title }}
        </h1>

        <div class="prose prose-lg prose-stone max-w-none font-body text-primary-800">
          <!-- Simple text display for now, could be markdown rendered later -->
          <p class="whitespace-pre-wrap">
            {{ news.content }}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

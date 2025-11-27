<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({
  layout: 'default',
})

const client = useSupabaseClient<Database>()
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.news.title'),
  description: () => t('seo.news.description'),
  ogTitle: () => `${t('seo.news.title')} - Cie des Oreilles`,
  ogDescription: () => t('seo.news.description'),
})

const currentPage = ref(1)
const pageSize = 6

const { data: count } = await useAsyncData('news-count', async () => {
  const { count } = await client
    .from('news')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)
  return count || 0
})

const totalPages = computed(() => Math.ceil((count.value || 0) / pageSize))

const { data: news } = await useAsyncData(() => `news-page-${currentPage.value}`, async () => {
  const from = (currentPage.value - 1) * pageSize
  const to = from + pageSize - 1
  const { data } = await client
    .from('news')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(from, to)
  return data
}, {
  watch: [currentPage],
})
</script>

<template>
  <div class="py-12 bgprimary950 min-h-screen textprimary50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-6xl font-serif font-bold textprimary100 mb-4 text-primary-500">
          {{
            $t('news.title') }}
        </h1>
        <p class="text-xl textprimary300 font-sans max-w-2xl mx-auto">
          {{ $t('news.subtitle') }}
        </p>
      </div>

      <!-- News Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <NewsCard v-for="item in news" :key="item.id" :news="item" />
      </div>

      <!-- Pagination -->
      <div class="flex justify-center gap-2 mt-12">
        <UButton
          v-for="page in totalPages" :key="page" :color="currentPage === page ? 'primary' : 'neutral'"
          :variant="currentPage === page ? 'solid' : 'ghost'"
          class="w-10 h-10 flex items-center justify-center font-bold rounded-full" @click="currentPage = page"
        >
          {{ page }}
        </UButton>
      </div>
    </div>
  </div>
</template>

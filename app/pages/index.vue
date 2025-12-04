<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({
  layout: 'default',
})

const client = useSupabaseClient<Database>()
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => `${t('seo.home.title')} - Cie des Oreilles`,
  ogDescription: () => t('seo.home.description'),
})

const { data: news } = await useAsyncData('home-news', async () => {
  const { data } = await client
    .from('news')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)
  return data
})

const { data: shows } = await useAsyncData('home-shows', async () => {
  const { data } = await client
    .from('shows')
    .select('*')
  return data
})

const featuredShow = computed(() => shows.value?.find(show => show.featured))
</script>

<template>
  <div>
    <TheHero />
    <AboutSection />
    <LazyFeaturedShow v-if="featuredShow" :show="featuredShow" />
    <LazyOtherCreation v-if="shows?.length" :shows="shows" />
    <LazyLatestNews v-if="news?.length" :news="news" />
  </div>
</template>

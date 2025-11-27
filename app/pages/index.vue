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
  // .eq('featured', true) // Assuming there is a featured flag, or just take all
  return data
})

const featuredShow = computed(() => shows.value?.[0])
const otherShows = computed(() => shows.value?.slice(1, 4))
</script>

<template>
  <div>
    <TheHero />
    <AboutSection />

    <!-- Featured Show Section -->
    <section v-if="featuredShow" class="py-20 bgprimary900 textprimary50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-serif font-bold textprimary100 mb-2 text-center">
          {{ $t('home.featured_show_title')
          }}
        </h2>
        <p class="textprimary300 text-center mb-12 font-sans">
          {{ $t('home.featured_show_subtitle') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <NuxtImg
              :src="featuredShow.image_url || 'https://placehold.co/800x800/2c1810/d4af37?text=Featured'"
              class="w-full rounded-lg shadow-2xl border borderprimary800"
            />
          </div>
          <div class="order-1 md:order-2 space-y-6">
            <h3 class="text-2xl font-serif font-bold textprimary100">
              {{ featuredShow.title }}
            </h3>
            <div class="prose prose-invert textprimary200 font-sans">
              <p>{{ featuredShow.description }}</p>
            </div>
            <div class="flex flex-col gap-2 textprimary300 font-sans">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-users" />
                <span>{{ $t('show.audience') }}: {{ featuredShow.audience || 'Tout public' }}</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-clock" />
                <span>{{ $t('show.duration') }}: {{ featuredShow.duration || '1h' }}</span>
              </div>
            </div>
            <UButton :to="`/shows/${featuredShow.slug}`" color="primary" variant="solid" size="lg" class="font-bold">
              {{ $t('home.book_tickets') }}
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Creations Section -->
    <section class="py-20 bgprimary950 textprimary50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-serif font-bold textprimary100 mb-2 text-center">
          {{ $t('home.other_creations_title')
          }}
        </h2>
        <p class="textprimary300 text-center mb-12 font-sans">
          {{ $t('home.other_creations_subtitle') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ShowCard v-for="show in otherShows" :key="show.id" :show="show" />
        </div>
      </div>
    </section>

    <!-- Latest News Preview -->
    <section class="py-20 bgprimary900 border-t borderprimary800">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-serif font-bold textprimary100 mb-2">
          {{ $t('home.latest_news_title') }}
        </h2>
        <p class="textprimary300 text-center mb-12 font-sans">
          {{ $t('home.latest_news_subtitle') }}
        </p>

        <div v-if="news?.length" class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
          <NewsCard v-for="item in news" :key="item.id" :news="item" />
        </div>
        <p v-else class="textprimary400 italic mb-8">
          {{ $t('home.no_news') }}
        </p>

        <div class="mt-8">
          <UButton to="/news" variant="link" color="primary" class="textprimary300 hover:textprimary100 font-bold">
            {{ $t('home.all_news') }} &rarr;
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

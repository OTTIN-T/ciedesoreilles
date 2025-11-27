<script setup lang="ts">
import type { Database } from '~/types/database.types'

const route = useRoute()
const client = useSupabaseClient<Database>()
const { locale } = useI18n({ useScope: 'global' })

const { data: show, pending, error } = await useAsyncData(`show-${route.params.slug}`, async () => {
  const { data } = await client
    .from('shows')
    .select('*')
    .eq('slug', route.params.slug as string)
    .single()
  return data
})

// Fetch upcoming dates for this show
const { data: upcomingDates } = await useAsyncData(`dates-${route.params.slug}`, async () => {
  if (!show.value)
    return []

  const { data } = await client
    .from('agenda')
    .select('*')
    .eq('show_id', show.value.id)
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })
    .limit(5)

  return data
}, { watch: [show] })

useSeoMeta({
  title: () => show.value?.title,
  description: () => show.value?.description?.substring(0, 160),
  ogTitle: () => show.value?.title,
  ogDescription: () => show.value?.description?.substring(0, 160),
  ogImage: () => show.value?.image_url || '/og-image.png',
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="pending" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-primary-600" />
    </div>

    <div v-else-if="error || !show" class="text-center py-12">
      <p class="text-red-600 mb-4">
        {{ $t('shows.error') }}
      </p>
      <UButton to="/spectacles" color="neutral" variant="ghost">
        {{ $t('shows.back') }}
      </UButton>
    </div>

    <div v-else class="grid md:grid-cols-2 gap-12 items-start">
      <!-- Image -->
      <div class="rounded-lg overflow-hidden shadow-2xl border-4 borderprimary300">
        <NuxtImg
          :src="show.image_url || 'https://placehold.co/800x1000/7b1113/FFF?text=Show'" :alt="show.title"
          class="w-full h-auto"
        />
      </div>

      <!-- Content -->
      <div>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6">
          {{ show.title }}
        </h1>

        <div class="prose prose-lg prose-stone font-body text-primary-800 mb-8">
          <p class="whitespace-pre-wrap">
            {{ show.description }}
          </p>
        </div>

        <div class="bgprimary100 p-6 rounded-lg border borderprimary200">
          <h3 class="text-xl font-serif font-bold text-primary-800 mb-4">
            {{ $t('shows.next_dates') }}
          </h3>
          <div v-if="upcomingDates && upcomingDates.length > 0" class="space-y-3">
            <div v-for="date in upcomingDates" :key="date.id" class="flex items-center gap-3">
              <UIcon name="i-heroicons-calendar" class="text-primary-600" />
              <span class="font-bold text-primary-900">
                {{ new Date(date.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', {
                  dateStyle: 'long',
                  timeStyle: 'short',
                }) }}
              </span>
              <span class="text-primary-700">- {{ date.location }}</span>
              <UButton
                v-if="date.link" :to="date.link" target="_blank" size="xs" color="primary" variant="ghost"
                icon="i-heroicons-arrow-top-right-on-square"
              >
                {{ $t('agenda.book') }}
              </UButton>
            </div>
          </div>
          <p v-else class="text-primary-600 italic">
            {{ $t('agenda.empty') }}
          </p>

          <div class="mt-6 pt-4 border-t borderprimary200">
            <UButton to="/contact" block color="primary" variant="solid">
              {{ $t('shows.contact_us') }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

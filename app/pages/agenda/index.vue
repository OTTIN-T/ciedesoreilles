<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({
  layout: 'default',
})

const client = useSupabaseClient<Database>()
const { locale, t } = useI18n()

useSeoMeta({
  title: () => t('seo.agenda.title'),
  description: () => t('seo.agenda.description'),
  ogTitle: () => `${t('seo.agenda.title')} - Cie des Oreilles`,
  ogDescription: () => t('seo.agenda.description'),
})

const { data: agenda, pending, error } = await useAsyncData('agenda', async () => {
  const { data } = await client
    .from('agenda')
    .select('*, shows(title)')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })
  return data
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl  font-bold text-primary-800 mb-8 text-center">
      {{ $t('agenda.title') }}
    </h1>

    <div v-if="pending" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-primary-600" />
    </div>

    <div v-else-if="error" class="text-center text-red-600 py-12">
      {{ $t('agenda.error') }}
    </div>

    <div v-else class="max-w-4xl mx-auto space-y-6">
      <div
        v-for="event in agenda" :key="event.id"
        class="bg-white rounded-lg shadow-md border-l-4 borderprimary500 p-6 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-lg transition-shadow"
      >
        <!-- Date Box -->
        <div class="shrink-0 w-24 text-center">
          <div class="text-2xl font-bold text-primary-600">
            {{ new Date(event.date).getDate() }}
          </div>
          <div class="text-sm uppercase text-primary-400">
            {{ new Date(event.date).toLocaleString(locale, {
              month:
                'short',
            }) }}
          </div>
        </div>

        <!-- Details -->
        <div class="grow">
          <h3 class="text-xl  font-bold text-primary-800 mb-1">
            {{ event.shows?.title }}
          </h3>
          <div class="flex items-center text-neutral-600 gap-2">
            <UIcon name="i-heroicons-clock" />
            <span>{{ new Date(event.date).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) }}</span>
          </div>
          <div class="flex items-center text-neutral-600 gap-2">
            <UIcon name="i-heroicons-map-pin" />
            <span>{{ event.location }}</span>
          </div>
        </div>

        <!-- Action -->
        <div class="shrink-0 mt-4 md:mt-0">
          <UButton
            v-if="event.link" :to="event.link" target="_blank" color="primary" variant="outline"
            icon="i-heroicons-ticket"
          >
            {{ $t('agenda.book') }}
          </UButton>
          <UButton v-else to="/contact" color="neutral" variant="ghost">
            {{ $t('agenda.more_info') }}
          </UButton>
        </div>
      </div>
    </div>

    <div v-if="!pending && agenda?.length === 0" class="text-center text-primary-600 py-12">
      {{ $t('agenda.empty') }}
    </div>
  </div>
</template>

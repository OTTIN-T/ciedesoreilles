<script setup lang="ts">
import type { Database } from '~/types/database.types'

const route = useRoute()
const client = useSupabaseClient<Database>()
const { t } = useI18n()

definePageMeta({
  layout: 'default',
})

const { data: show } = await useAsyncData(`show-${route.params.slug}`, async () => {
  const { data } = await client
    .from('shows')
    .select('*')
    .eq('slug', route.params.slug as string)
    .single()
  return data
})

const { data: agenda } = await useAsyncData(`agenda-${route.params.slug}`, async () => {
  if (!show.value)
    return []
  const { data } = await client
    .from('agenda')
    .select('*')
    .eq('show_id', show.value.id)
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })
  return data
})

const nextDate = computed(() => agenda.value?.[0])

useSeoMeta({
  title: () => show.value?.title || t('seo.default.title'),
  description: () => show.value?.description || t('seo.default.description'),
  ogTitle: () => `${show.value?.title || t('seo.default.title')} - Cie des Oreilles`,
  ogDescription: () => show.value?.description || t('seo.default.description'),
  ogImage: () => show.value?.image_url,
})
</script>

<template>
  <div v-if="show" class="bgprimary950 min-h-screen textprimary50">
    <!-- Hero Section -->
    <section class="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <NuxtImg
          :src="show.image_url || 'https://placehold.co/1920x1080/2c1810/d4af37?text=Show+Hero'"
          class="w-full h-full object-cover opacity-50"
        />
        <div class="absolute inset-0 bg-linear-to-t fromprimary950 viaprimary950/40 to-transparent" />
      </div>
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
        <h1 class="text-5xl md:text-7xl  font-bold mb-4 textprimary50 drop-shadow-xl">
          {{ show.title }}
        </h1>
        <p class="text-xl md:text-2xl    mb-8 textprimary200 drop-shadow-md">
          {{
            show.description?.substring(0, 100) }}...
        </p>
        <UButton to="#tickets" size="xl" color="primary" variant="solid" class="font-bold px-8 py-3 shadow-lg">
          {{ $t('show.book_tickets') }}
        </UButton>
      </div>
    </section>

    <!-- Info Bar -->
    <div class="bgprimary900 border-y borderprimary800 py-4">
      <div class="container mx-auto px-4 flex flex-wrap justify-center gap-8 textprimary300  ">
        <div v-if="nextDate" class="flex items-center gap-2">
          <UIcon name="i-heroicons-calendar" class="w-5 h-5 text-primary-500" />
          <span>{{ $t('show.next_date') }}: {{ new Date(nextDate.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
          }) }}</span>
        </div>
        <div v-if="nextDate" class="flex items-center gap-2">
          <UIcon name="i-heroicons-clock" class="w-5 h-5 text-primary-500" />
          <span>{{ new Date(nextDate.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }}</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-12">
          <section>
            <h2 class="text-3xl  font-bold textprimary100 mb-6">
              {{ $t('show.about_title') }}
            </h2>
            <div class="prose prose-lg prose-invert textprimary200  ">
              <p>{{ show.description }}</p>
            </div>
          </section>

          <!-- Gallery (Mock) -->
          <section>
            <h2 class="text-3xl  font-bold textprimary100 mb-6">
              {{ $t('show.gallery') }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NuxtImg
                src="https://placehold.co/600x400/2c1810/d4af37?text=Gallery+1"
                class="rounded-lg shadow-md border borderprimary800"
              />
              <NuxtImg
                src="https://placehold.co/600x400/3e1810/d4af37?text=Gallery+2"
                class="rounded-lg shadow-md border borderprimary800"
              />
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <div class="bgprimary900 p-6 rounded-lg border borderprimary800 shadow-lg">
            <h3 class="text-xl  font-bold textprimary100 mb-6 border-b borderprimary800 pb-2">
              {{
                $t('show.details') }}
            </h3>
            <ul class="space-y-4  textprimary200">
              <li class="flex items-start gap-3">
                <UIcon name="i-heroicons-clock" class="w-6 h-6 text-primary-500 shrink-0" />
                <div>
                  <span class="block font-bold textprimary100">{{ $t('show.duration') }}</span>
                  <span>{{ show.duration || '1h 15min' }}</span>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <UIcon name="i-heroicons-users" class="w-6 h-6 text-primary-500 shrink-0" />
                <div>
                  <span class="block font-bold textprimary100">{{ $t('show.audience') }}</span>
                  <span>{{ show.audience || 'Dès 6 ans' }}</span>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <UIcon name="i-heroicons-user-group" class="w-6 h-6 text-primary-500 shrink-0" />
                <div>
                  <span class="block font-bold textprimary100">{{ $t('show.director') }}</span>
                  <span>J. Dupont</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Agenda Section -->
    <section id="tickets" class="py-16 bgprimary900 border-t borderprimary800">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl  font-bold textprimary100 mb-8 text-center">
          {{ $t('show.upcoming_dates') }}
        </h2>
        <div class="space-y-4">
          <div
            v-for="date in agenda" :key="date.id"
            class="bgprimary950 border borderprimary800 p-6 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4 hover:border-primary-500 transition-colors"
          >
            <div class="text-center md:text-left">
              <div class="text-xl font-bold textprimary100  ">
                {{ new Date(date.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' })
                }}
              </div>
              <div class="textprimary400  ">
                {{ new Date(date.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }}
              </div>
            </div>
            <div class="text-center md:text-left flex-1 md:px-8">
              <div class="text-lg textprimary200 font-bold">
                {{ date.location }}
              </div>
              <div class="textprimary400 text-sm">
                {{ date.location }}
              </div>
            </div>
            <div>
              <UButton
                v-if="date.link" :to="date.link" target="_blank" color="primary" variant="solid"
                class="font-bold px-6"
              >
                {{ $t('show.book') }}
              </UButton>
              <UButton v-else disabled color="neutral" variant="solid" class="font-bold px-6 opacity-50">
                {{ $t('show.sold_out') }}
              </UButton>
            </div>
          </div>
          <p v-if="!agenda?.length" class="text-center textprimary400 italic">
            {{ $t('show.no_dates') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

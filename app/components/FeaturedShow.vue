<script setup lang="ts">
import type { Database } from '~/types/database.types';

defineProps<{
  show: Database['public']['Tables']['shows']['Row']
}>()
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-2 text-center">
        {{ $t('home.featured_show_title')
        }}
      </h2>
      <p class="text-primary-200 text-center mb-12  ">
        {{ $t('home.featured_show_subtitle') }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1">
          <NuxtImg :src="show.image_url || 'https://placehold.co/800x800/2c1810/d4af37?text=Featured'"
            class="w-full rounded-lg shadow-2xl border border-primary-800" :alt="show.title" loading="lazy"
            format="webp" />
        </div>
        <div class="order-1 md:order-2 space-y-6">
          <h3 class="text-2xl font-bold">
            {{ show.title }}
          </h3>
          <div class="prose prose-invert text-primary-100">
            <p>{{ show.description }}</p>
          </div>
          <div class="flex flex-col gap-2 text-primary-200">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-user-group" size="28" />
              <span>{{ $t('show.audience') }}:
                <span class="font-bold text-white">
                  {{ show.audience || $t('show.audience_value') }}
                </span>
              </span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-clock" size="28" />
              <span>{{ $t('show.duration') }}:
                <span class="font-bold text-white">
                  {{ show.duration || '2h' }}
                </span>
              </span>
            </div>
          </div>
          <UButton :to="`/shows/${show.slug}`" color="primary" size="lg" class="font-bold">
            {{ $t('show.more_info') }}
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

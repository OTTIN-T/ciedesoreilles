<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.backstage.title'),
  description: () => t('seo.backstage.description'),
  ogTitle: () => `${t('seo.backstage.title')} - Cie des Oreilles`,
  ogDescription: () => t('seo.backstage.description'),
})

const activeFilter = ref('all')

const filters = computed(() => [
  { label: t('backstage.filter.all'), value: 'all' },
  { label: t('backstage.filter.puppets'), value: 'puppets' },
  { label: t('backstage.filter.decor'), value: 'decor' },
  { label: t('backstage.filter.rehearsal'), value: 'rehearsal' },
])

const items = [
  { id: 1, title: 'Sculpture de la tête de Renart', category: 'puppets', categoryLabel: 'Création Marionnettes', image: 'https://placehold.co/600x800/2c1810/d4af37?text=Renart', type: 'image' },
  { id: 2, title: 'L\'atelier des marionnettistes', category: 'puppets', categoryLabel: 'Création Marionnettes', image: 'https://placehold.co/600x800/3e1810/d4af37?text=Atelier', type: 'image' },
  { id: 3, title: 'Peinture des décors de la forêt', category: 'decor', categoryLabel: 'Fabrication Décors', image: 'https://placehold.co/600x800/1a1206/d4af37?text=Decor', type: 'image' },
  { id: 4, title: 'Répétition de la scène du puits', category: 'rehearsal', categoryLabel: 'Répétitions', image: 'https://placehold.co/600x800/2b230b/d4af37?text=Repetition', type: 'video' },
  { id: 5, title: 'Assemblage de la marionnette d\'Ysengrin', category: 'puppets', categoryLabel: 'Création Marionnettes', image: 'https://placehold.co/600x800/4a3b2a/d4af37?text=Ysengrin', type: 'image' },
  { id: 6, title: 'Détails du costume de la reine', category: 'puppets', categoryLabel: 'Création Marionnettes', image: 'https://placehold.co/600x800/5c4d3c/d4af37?text=Reine', type: 'image' },
  { id: 7, title: 'Marionnettistes en action', category: 'rehearsal', categoryLabel: 'Répétitions', image: 'https://placehold.co/600x800/2c1810/d4af37?text=Action', type: 'video' },
  { id: 8, title: 'Création des accessoires de scène', category: 'decor', categoryLabel: 'Fabrication Décors', image: 'https://placehold.co/600x800/3e1810/d4af37?text=Accessoires', type: 'image' },
]

const filteredItems = computed(() => {
  if (activeFilter.value === 'all')
    return items
  return items.filter(item => item.category === activeFilter.value)
})
</script>

<template>
  <div class="py-12 bgprimary950 min-h-screen textprimary50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl  font-bold textprimary100 mb-4">
          {{ $t('backstage.title') }}
        </h1>
        <p class="text-xl textprimary300  max-w-2xl mx-auto">
          {{ $t('backstage.subtitle') }}
        </p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <UButton
          v-for="filter in filters" :key="filter.value"
          :color="activeFilter === filter.value ? 'primary' : 'neutral'"
          :variant="activeFilter === filter.value ? 'solid' : 'outline'" class="font-bold"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </UButton>
      </div>

      <!-- Gallery -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="item in filteredItems" :key="item.id"
          class="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer border borderprimary800 shadow-lg"
        >
          <NuxtImg
            :src="item.image" :alt="item.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
          >
            <h3 class="text-lg font-bold textprimary100 mb-1">
              {{ item.title }}
            </h3>
            <span class="text-sm textprimary300 uppercase tracking-wider">{{ item.categoryLabel }}</span>
            <UIcon
              v-if="item.type === 'video'" name="i-heroicons-play-circle"
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

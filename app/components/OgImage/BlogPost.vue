<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  image?: string
  siteName?: string
}>(), {
  title: 'Titre',
  siteName: 'ciedesoreilles.fr',
  image: '/logo.png',
})
</script>

<template>
  <div class="w-full h-full flex bg-[#fbf7ef] border-[12px] border-[#7c581a]">
    <div class="flex flex-col justify-between p-16 h-full" :class="image ? 'w-2/3' : 'w-full'">
      <div class="flex flex-col">
        <h1 class="text-6xl  font-bold text-[#3e1810] mb-6 leading-tight">
          {{ title }}
        </h1>
        <p v-if="description" class="text-3xl text-[#7b1113] leading-normal">
          {{ description }}
        </p>
      </div>
      <div class="flex items-center mt-auto">
        <NuxtImg :src="image" width="200" height="130" />
        <p class="text-2xl font-bold text-[#7b1113]">
          {{ siteName }}
        </p>
      </div>
    </div>
  </div>
</template>

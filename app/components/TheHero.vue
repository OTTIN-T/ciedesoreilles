<template>
  <section class="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden ">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <NuxtImg
        src="/show/show-1.png" alt="Le Roman de Renart" class="w-full h-full object-cover opacity-60" preload
        quality="80" format="webp"
      />
      <!-- <div class="absolute inset-0 bg-linear-to-t from-primary-500 via-primary-500/50 to-transparent" />
      <div class="absolute inset-0 bg-linear-to-b from-primary-500/80 via-transparent to-transparent" /> -->
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
      <h1 class="text-5xl md:text-7xl font-bold mb-4 drop-shadow-xl tracking-wide">
        {{ $t('hero.title') }}
      </h1>
      <p class="text-xl md:text-2xl mb-10 text-primary-200 drop-shadow-lg max-w-2xl mx-auto">
        {{ $t('hero.subtitle') }}
      </p>
      <div class="flex flex-row gap-4 justify-center">
        <UButton
          to="/shows" size="xl" color="primary"
          class=" font-bold px-8 py-3 rounded-md shadow-lg shadow-primary-900/50 hover:scale-105 transition-transform"
        >
          {{ $t('hero.discover_shows') }}
        </UButton>
      </div>
    </div>
  </section>
</template>

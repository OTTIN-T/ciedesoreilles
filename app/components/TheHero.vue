<template>
  <section
    class="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bgprimary950 textprimary50"
  >
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <NuxtImg
        src="https://placehold.co/1920x1080/2c1810/d4af37?text=Le+Roman+de+Renart" alt="Le Roman de Renart"
        class="w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0 bg-linear-to-t fromprimary950 viaprimary950/50 to-transparent" />
      <div class="absolute inset-0 bg-linear-to-b fromprimary950/80 via-transparent to-transparent" />
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
      <h1 class="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-xl textprimary50 tracking-wide">
        {{ $t('hero.title') }}
      </h1>
      <p class="text-xl md:text-2xl font-sans font-light mb-10 textprimary200 drop-shadow-lg max-w-2xl mx-auto">
        {{ $t('hero.subtitle') }}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton
          to="/shows/le-roman-de-renart" size="xl" color="primary" variant="solid"
          class="font-sans font-bold px-8 py-3 rounded-md shadow-lg shadowprimary900/50 hover:scale-105 transition-transform"
        >
          {{ $t('hero.discover_show') }}
        </UButton>
      </div>
    </div>
  </section>
</template>

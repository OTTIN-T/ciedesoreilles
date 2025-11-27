<template>
  <section class="py-20 bgprimary950 textprimary50">
    <div class="container mx-auto px-4 text-center max-w-3xl">
      <h2 class="text-3xl md:text-4xl font-serif font-bold textprimary100 mb-6">
        {{ $t('about.title') }}
      </h2>
      <div class="prose prose-lg prose-invert mx-auto textprimary200 font-sans mb-10">
        <p>{{ $t('about.description') }}</p>
      </div>
      <UButton to="/company" color="primary" variant="solid" class="font-bold px-6 py-2">
        {{ $t('about.learn_more') }}
      </UButton>
    </div>
  </section>
</template>

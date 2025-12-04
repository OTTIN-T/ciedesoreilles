<template>
  <section class="py-20  ">
    <div class="container mx-auto px-4 text-center max-w-3xl">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">
        {{ $t('about.title') }}
      </h2>
      <div class="prose prose-lg prose-invert mx-auto text-primary-200 mb-10">
        <p>{{ $t('about.description') }}</p>
      </div>
      <UButton to="/company" size="xl" color="primary" class="font-bold px-6 py-2">
        {{ $t('about.learn_more') }}
      </UButton>
    </div>
  </section>
</template>

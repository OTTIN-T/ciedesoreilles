<template>
  <div class="min-h-screen flex flex-col  selection:text-primary-950">
    <TheHeader />
    <main class="grow">
      <slot />
    </main>
    <LazyTheFooter />
  </div>
</template>

<template>
  <div class="min-h-screen flex flex-col selection:bgprimary500 selection:textprimary950">
    <TheHeader />
    <main class="grow">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

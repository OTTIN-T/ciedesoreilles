<script lang="ts" setup>
defineOgImageComponent('BlogPost', {
  image: '/logo.png',
})
</script>

<template>
  <UApp>
    <NuxtPwaAssets />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

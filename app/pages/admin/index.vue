<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})
</script>

<template>
  <div>
    <div class="grid md:grid-cols-3 gap-6">
      <UCard class="ring-1 ring-neutral-200 shadow-sm">
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-neutral-100 rounded-lg">
              <UIcon name="i-heroicons-newspaper" class="text-xl text-neutral-700" />
            </div>
            <h3 class="font-semibold text-neutral-900">
              {{ $t('admin.news') }}
            </h3>
          </div>
        </template>
        <p class="text-sm text-neutral-500 mb-6">
          Gérez les actualités du site.
        </p>
        <template #footer>
          <UButton to="/admin/news" color="neutral" block variant="solid">
            {{ $t('admin.manage') }}
          </UButton>
        </template>
      </UCard>

      <!-- Shows management -->
      <UCard class="ring-1 ring-neutral-200 shadow-sm">
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-neutral-100 rounded-lg">
              <UIcon name="i-heroicons-ticket" class="text-xl text-neutral-700" />
            </div>
            <h3 class="font-semibold text-neutral-900">
              {{ $t('nav.shows') }}
            </h3>
          </div>
        </template>
        <p class="text-sm text-neutral-500 mb-6">
          Gérez les spectacles de la compagnie.
        </p>
        <template #footer>
          <UButton to="/admin/shows" color="neutral" block variant="solid">
            {{ $t('admin.manage') }}
          </UButton>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

definePageMeta({
  layout: 'default',
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description'),
  ogTitle: () => `${t('seo.contact.title')} - Cie des Oreilles`,
  ogDescription: () => t('seo.contact.description'),
})

const loading = ref(false)
const success = ref(false)

const schema = z.object({
  name: z.string().min(1, t('contact.validation.name_required')),
  email: z.email(t('contact.validation.email_invalid')),
  message: z.string().min(10, t('contact.validation.message_min')),
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: '',
  email: '',
  message: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // TODO: Add form validation
  loading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
  success.value = true
  state.name = ''
  state.email = ''
  state.message = ''
}
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-2xl">
    <h1 class="text-4xl  font-bold text-primary-800 mb-8 text-center">
      {{ $t('contact.title') }}
    </h1>

    <div class="bg-white p-8 rounded-lg shadow-xl border borderprimary200">
      <p class="text-primary-700 mb-8 text-center">
        {{ $t('contact.intro') }}
      </p>

      <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
        <UFormField :label="$t('contact.form.name')" name="name">
          <UInput v-model="state.name" color="primary" class="w-full" />
        </UFormField>

        <UFormField :label="$t('contact.form.email')" name="email">
          <UInput v-model="state.email" type="email" color="primary" class="w-full" />
        </UFormField>

        <UFormField :label="$t('contact.form.message')" name="message">
          <UTextarea v-model="state.message" color="primary" :rows="5" class="w-full" />
        </UFormField>

        <div class="flex justify-end">
          <UButton type="submit" color="primary" size="lg" :loading="loading">
            {{ $t('contact.form.send') }}
          </UButton>
        </div>
      </UForm>

      <div v-if="success" class="mt-6 p-4 bg-green-100 text-green-800 rounded-lg border border-green-200 text-center">
        {{ $t('contact.success') }}
      </div>
    </div>
  </div>
</template>

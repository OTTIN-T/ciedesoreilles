<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { Database } from '~/types/database.types'
import { z } from 'zod'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const route = useRoute()
const client = useSupabaseClient<Database>()
const { t } = useI18n()
const isNew = route.params.id === 'new'
const saving = ref(false)
const uploading = ref(false)

const schema = z.object({
  title: z.string().min(1, t('admin.validation.title_required')),
  slug: z.string().min(1, 'Slug requis'),
  description: z.string().optional(),
  image_url: z.string().nullable().optional(),
  featured: z.boolean(),
  audience: z.string().optional(),
  duration: z.string().optional(),
})

type Schema = z.output<typeof schema>

const form = reactive({
  title: '',
  slug: '',
  description: '',
  image_url: null as string | null,
  featured: false,
  audience: '',
  duration: '',
})

// Load existing data
if (!isNew) {
  const { data } = await client
    .from('shows')
    .select('*')
    .eq('id', Number.parseInt(route.params.id as string))
    .single()

  if (data) {
    form.title = data.title
    form.slug = data.slug
    form.description = data.description || ''
    form.image_url = data.image_url
    form.featured = data.featured || false
    form.audience = data.audience || ''
    form.duration = data.duration || ''
  }
}

async function uploadImage(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return

  uploading.value = true
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await client.storage
    .from('images')
    .upload(filePath, file)

  if (uploadError) {
    alert('Erreur lors du téléchargement de l\'image')
  }
  else {
    const { data: { publicUrl } } = client.storage
      .from('images')
      .getPublicUrl(filePath)
    form.image_url = publicUrl
  }
  uploading.value = false
}

async function save(event: FormSubmitEvent<Schema>) {
  saving.value = true

  const dataToSave = {
    title: event.data.title,
    slug: event.data.slug,
    description: event.data.description,
    image_url: event.data.image_url,
    featured: event.data.featured,
    audience: event.data.audience,
    duration: event.data.duration,
  }

  if (isNew) {
    await client.from('shows').insert(dataToSave)
  }
  else {
    await client.from('shows').update(dataToSave).eq('id', Number.parseInt(route.params.id as string))
  }

  saving.value = false
  navigateTo('/admin/shows')
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center gap-4 mb-8">
      <UButton to="/admin/shows" color="neutral" variant="ghost" icon="i-heroicons-arrow-left" />
      <h1 class="text-2xl font-bold text-neutral-900">
        {{ isNew ? 'Nouveau spectacle' : 'Modifier le spectacle' }}
      </h1>
    </div>

    <UForm
      :schema="schema" :state="form" class="space-y-6 bg-white p-8 rounded-lg shadow-sm ring-1 ring-neutral-200"
      @submit="save"
    >
      <UFormField label="Titre" name="title">
        <UInput v-model="form.title" required class="w-full" />
      </UFormField>

      <UFormField label="Slug" name="slug">
        <UInput v-model="form.slug" required class="w-full" />
      </UFormField>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Public" name="audience">
          <UInput v-model="form.audience" class="w-full" placeholder="ex: Tout public" />
        </UFormField>

        <UFormField label="Durée" name="duration">
          <UInput v-model="form.duration" class="w-full" placeholder="ex: 50 min" />
        </UFormField>
      </div>

      <UFormField label="Image" name="image">
        <div class="space-y-4 w-full">
          <div v-if="form.image_url" class="relative w-full h-48 rounded-lg overflow-hidden ring-1 ring-neutral-200">
            <img :src="form.image_url" class="w-full h-full object-cover">
            <UButton
              color="error" variant="solid" icon="i-heroicons-trash" size="xs" class="absolute top-2 right-2"
              @click="form.image_url = null"
            />
          </div>
          <input
            type="file" accept="image/*"
            class="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-50 file:text-neutral-700 hover:file:bg-neutral-100"
            @change="uploadImage"
          >
          <div v-if="uploading" class="text-sm text-neutral-600">
            Téléchargement en cours...
          </div>
        </div>
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea v-model="form.description" :rows="10" class="w-full" />
      </UFormField>

      <UFormField name="featured">
        <UCheckbox v-model="form.featured" label="Mettre à la une" color="neutral" />
      </UFormField>

      <div class="flex justify-end gap-4 pt-4 border-t border-neutral-100">
        <UButton to="/admin/shows" color="neutral" variant="ghost">
          {{ $t('admin.cancel') }}
        </UButton>
        <UButton type="submit" color="neutral" :loading="saving">
          {{ $t('admin.save') }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>

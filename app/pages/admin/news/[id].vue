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
  content: z.string().optional(),
  image_url: z.string().nullable().optional(),
  published: z.boolean(),
})

type Schema = z.output<typeof schema>

const form = reactive({
  title: '',
  content: '',
  image_url: null as string | null,
  published: true,
})

// Load existing data
if (!isNew) {
  const { data } = await client
    .from('news')
    .select('*')
    .eq('id', Number.parseInt(route.params.id as string))
    .single()

  if (data) {
    form.title = data.title
    form.content = data.content || ''
    form.image_url = data.image_url
    form.published = data.published || false
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
    // TODO: Handle error
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
    content: event.data.content,
    image_url: event.data.image_url,
    published: event.data.published,
  }

  if (isNew) {
    await client.from('news').insert(dataToSave)
  }
  else {
    await client.from('news').update(dataToSave).eq('id', Number.parseInt(route.params.id as string))
  }

  saving.value = false
  navigateTo('/admin/news')
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center gap-4 mb-8">
      <UButton to="/admin/news" color="neutral" variant="ghost" icon="i-heroicons-arrow-left" />
      <h1 class="text-2xl font-bold text-neutral-900">
        {{ isNew ? $t('admin.new_news') : $t('admin.manage') }}
      </h1>
    </div>

    <UForm
      :schema="schema" :state="form" class="space-y-6 bg-white p-8 rounded-lg shadow-sm ring-1 ring-neutral-200"
      @submit="save"
    >
      <UFormField label="Titre" name="title">
        <UInput v-model="form.title" required class="w-full" />
      </UFormField>

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

      <UFormField label="Contenu" name="content">
        <UTextarea v-model="form.content" :rows="10" class="w-full" />
      </UFormField>

      <UFormField name="published">
        <UCheckbox v-model="form.published" label="Publier immédiatement" color="neutral" />
      </UFormField>

      <div class="flex justify-end gap-4 pt-4 border-t border-neutral-100">
        <UButton to="/admin/news" color="neutral" variant="ghost">
          {{ $t('admin.cancel') }}
        </UButton>
        <UButton type="submit" color="neutral" :loading="saving">
          {{ $t('admin.save') }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>

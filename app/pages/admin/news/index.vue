<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Database } from '~/types/database.types'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const client = useSupabaseClient<Database>()

type NewsItem = Database['public']['Tables']['news']['Row']

const columns: TableColumn<NewsItem>[] = [
  { accessorKey: 'title', header: 'Titre' },
  { accessorKey: 'created_at', header: 'Date' },
  { accessorKey: 'published', header: 'Statut' },
  { accessorKey: 'actions', header: 'Actions' },
]

const { data: news, pending, refresh } = await useAsyncData<Database['public']['Tables']['news']['Row'][]>('admin-news', async () => {
  const { data } = await client
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
})

async function deleteNews(id: number) {
  // TODO: Add confirmation dialog
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?'))
    return

  await client.from('news').delete().eq('id', id)
  refresh()
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-neutral-900">
        {{ $t('admin.news') }}
      </h1>
      <UButton to="/admin/news/new" color="admin" class="text-admin-950" icon="i-heroicons-plus">
        {{ $t('admin.new_news')
        }}
      </UButton>
    </div>

    <UTable
      :data="news" :columns="columns" :loading="pending"
      class="bg-white ring-1 ring-neutral-200 rounded-lg shadow-sm"
    >
      <template #created_at-cell="{ row }">
        <span class="text-neutral-600">{{ new Date(row.getValue('created_at')).toLocaleDateString('fr-FR') }}</span>
      </template>

      <template #published-cell="{ row }">
        <UBadge :color="row.getValue('published') ? 'success' : 'neutral'" variant="subtle" size="xs">
          {{ row.getValue('published') ? 'Publié' : 'Brouillon' }}
        </UBadge>
      </template>

      <template #actions-cell="{ row }">
        <div class="flex gap-2 justify-end">
          <UButton
            :to="`/admin/news/${row.original.id}`" color="neutral" variant="ghost"
            icon="i-heroicons-pencil-square" size="xs"
          />
          <UButton
            color="error" variant="ghost" icon="i-heroicons-trash" size="xs"
            @click="deleteNews(row.original.id)"
          />
        </div>
      </template>
    </UTable>
  </div>
</template>

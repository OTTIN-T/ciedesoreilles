<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Database } from '~/types/database.types'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const client = useSupabaseClient<Database>()

type ShowItem = Database['public']['Tables']['shows']['Row']

const columns: TableColumn<ShowItem>[] = [
  { accessorKey: 'title', header: 'Titre' },
  { accessorKey: 'slug', header: 'Slug' },
  { accessorKey: 'featured', header: 'A la une' },
  { accessorKey: 'actions', header: 'Actions' },
]

const { data: shows, pending, refresh } = await useAsyncData<Database['public']['Tables']['shows']['Row'][]>('admin-shows', async () => {
  const { data } = await client
    .from('shows')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
})

async function deleteShow(id: number) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce spectacle ?'))
    return

  await client.from('shows').delete().eq('id', id)
  refresh()
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-neutral-900">
        Spectacles
      </h1>
      <UButton to="/admin/shows/new" color="neutral" class="text-neutral-900" icon="i-heroicons-plus">
        Nouveau spectacle
      </UButton>
    </div>

    <UTable
      :data="shows" :columns="columns" :loading="pending"
      class="bg-white ring-1 ring-neutral-200 rounded-lg shadow-sm"
    >
      <template #featured-cell="{ row }">
        <UBadge :color="row.getValue('featured') ? 'success' : 'neutral'" variant="subtle" size="xs">
          {{ row.getValue('featured') ? 'Oui' : 'Non' }}
        </UBadge>
      </template>

      <template #actions-cell="{ row }">
        <div class="flex gap-2 justify-end">
          <UButton
            :to="`/admin/shows/${row.original.id}`" color="neutral" variant="ghost"
            icon="i-heroicons-pencil-square" size="xs"
          />
          <UButton
            color="error" variant="ghost" icon="i-heroicons-trash" size="xs"
            @click="deleteShow(row.original.id)"
          />
        </div>
      </template>
    </UTable>
  </div>
</template>

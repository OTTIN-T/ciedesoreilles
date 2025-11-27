<script setup lang="ts">
const supabase = useSupabaseClient()

async function handleLogout() {
  await supabase.auth.signOut()
  navigateTo('/admin/login')
}
</script>

<template>
  <div class="min-h-screen flex bg-neutral-50 font-sans text-neutral-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-neutral-200 flex flex-col shadow-sm z-10">
      <div class="p-6 border-b border-neutral-100">
        <h1 class="text-xl font-bold text-neutral-900 tracking-tight">
          {{ $t('admin.panel_title') }}
        </h1>
        <p class="text-xs text-neutral-500 mt-1">
          {{ $t('admin.company_name') }}
        </p>
      </div>

      <nav class="grow p-4 space-y-1">
        <NuxtLink
          to="/admin"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
          active-class="bg-admin-50 text-admin-900" class-active="bg-admin-50 text-admin-900"
          :class="[$route.path === '/admin' ? 'bg-admin-50 text-admin-900' : 'text-neutral-700 hover:bg-admin-50 hover:text-admin-900']"
        >
          <UIcon name="i-heroicons-home" class="w-5 h-5" />
          {{ $t('admin.dashboard') }}
        </NuxtLink>
        <NuxtLink
          to="/admin/news"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
          active-class="bg-admin-50 text-admin-900"
          :class="[$route.path.startsWith('/admin/news') ? 'bg-admin-50 text-admin-900' : 'text-neutral-700 hover:bg-admin-50 hover:text-admin-900']"
        >
          <UIcon name="i-heroicons-newspaper" class="w-5 h-5" />
          {{ $t('admin.news') }}
        </NuxtLink>

        <div class="pt-8 mt-4 border-t border-neutral-100">
          <NuxtLink
            to="/" target="_blank"
            class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-5 h-5" />
            {{ $t('admin.view_site') }}
          </NuxtLink>
        </div>
      </nav>

      <div class="p-4 border-t border-neutral-100">
        <UButton
          block color="neutral" variant="ghost" icon="i-heroicons-arrow-left-on-rectangle"
          class="justify-start text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50" @click="handleLogout"
        >
          {{ $t('admin.logout') }}
        </UButton>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="grow flex flex-col h-screen overflow-hidden">
      <header class="bg-white border-b border-neutral-200 px-8 py-4 flex justify-between items-center shrink-0">
        <h2 class="text-lg font-semibold text-neutral-800 capitalize">
          {{ $route.name?.toString().replace('admin-',
                                             '').replace('-', ' ') }}
        </h2>
        <div class="flex items-center gap-4">
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Admin" size="sm" />
        </div>
      </header>
      <div class="grow p-8 overflow-y-auto">
        <slot />
      </div>
    </main>
  </div>
</template>

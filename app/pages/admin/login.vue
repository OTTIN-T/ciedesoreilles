<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const supabase = useSupabaseClient()
const { t } = useI18n()

const schema = z.object({
  email: z.email(t('admin.validation.email_invalid')),
  password: z.string().min(6, t('admin.validation.password_min')),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: '',
})
const loading = ref(false)
const error = ref<string | null>(null)

async function handleLogin(event: FormSubmitEvent<Schema>) {
  loading.value = true
  error.value = null

  const { error: authError } = await supabase.auth.signInWithPassword({
    email: state.email,
    password: state.password,
  })

  if (authError) {
    error.value = 'Erreur de connexion. Vérifiez vos identifiants.'
  }
  else {
    // Wait for the user session to be fully established
    const user = useSupabaseUser()
    while (!user.value) {
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    await navigateTo('/admin')
  }

  loading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-admin-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-xl border border-admin-200">
      <h1 class="text-3xl font-serif font-bold text-admin-800 mb-6 text-center">
        {{ $t('admin.login_title') }}
      </h1>

      <UForm :schema="schema" :state="state" class="space-y-6" @submit="handleLogin">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" type="email" icon="i-heroicons-envelope" color="primary" class="w-full" />
        </UFormField>

        <UFormField label="Mot de passe" name="password">
          <UInput
            v-model="state.password" type="password" icon="i-heroicons-lock-closed" color="primary"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" block color="primary" :loading="loading">
          Se connecter
        </UButton>

        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>
      </UForm>
    </div>
  </div>
</template>

<template>
  <footer class="bgprimary950 text-primary-200 border-t-4 borderprimary800 mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-serif text-primary-400 mb-4">
            {{ $t('footer.company_name') }}
          </h3>
          <p class="text-sm whitespace-pre-line">
            {{ $t('footer.company_desc') }}
          </p>
        </div>
        <div>
          <h3 class="text-xl font-serif text-primary-400 mb-4">
            {{ $t('footer.contact_title') }}
          </h3>
          <p class="text-sm">
            Email: contact@ciedesoreilles.fr<br>
            Tél: 06 00 00 00 00
          </p>
        </div>
        <div>
          <h3 class="text-xl font-serif text-primary-400 mb-4">
            {{ $t('footer.follow_us') }}
          </h3>
          <div class="flex gap-4">
            <UButton icon="i-simple-icons-facebook" color="neutral" variant="ghost" to="#" target="_blank" />
            <UButton icon="i-simple-icons-instagram" color="neutral" variant="ghost" to="#" target="_blank" />
          </div>
        </div>
      </div>
      <div class="border-t borderprimary900 mt-8 pt-4 text-center text-xs text-primary-600">
        &copy; {{ new Date().getFullYear() }} {{ $t('footer.rights_reserved') }}
      </div>
    </div>
  </footer>
</template>

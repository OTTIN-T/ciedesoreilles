// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineOrganization } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxtjs/supabase',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@vite-pwa/nuxt',
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  app: {
    pageTransition: true,
    layoutTransition: true,
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      title: 'Cie des Oreilles',
      meta: [
        {
          name: 'description',
          content: 'Site de la Compagnie des Oreilles',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: 'Cie des Oreilles',
        },
        {
          name: 'mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'author',
          content: 'Cie des Oreilles',
        },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          href: '/pwa/icons/maskable-icon-512x512.png',
          sizes: '512x512',
        },
      ],
    },
    keepalive: true,
  },
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://www.ciedesoreilles.fr',
    name: 'Cie des Oreilles',
    description: 'Site de la Compagnie des Oreilles',
    defaultLocale: 'fr',
  },
  experimental: {
    viewTransition: true,
    typedPages: true,
    restoreState: true,
    cookieStore: true,
    browserDevtoolsTiming: true,
    clientNodeCompat: true,
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    minify: true,
    routeRules: {
      '/__og-image__/**': { prerender: false },
      '/_nuxt/**': {
        prerender: true,
        headers: {
          'cache-control': 's-maxage=31536000, max-age=31536000',
        },
      },
      '/': {
        prerender: true,
        cache: {
          swr: true,
          maxAge: 300,
          staleMaxAge: 600,
        },
      },
      '/shows/**': {
        prerender: true,
        cache: {
          swr: true,
          maxAge: 300,
          staleMaxAge: 600,
        },
      },
      '/news/**': {
        prerender: true,
        cache: {
          swr: true,
          maxAge: 300,
          staleMaxAge: 600,
        },
      },
      '/contact': {
        prerender: true,
        cache: {
          swr: true,
          maxAge: 300,
          staleMaxAge: 600,
        },
      },
      '/company': {
        prerender: true,
        cache: {
          swr: true,
          maxAge: 300,
          staleMaxAge: 600,
        },
      },
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@nuxt/ui')) {
                return 'ui'
              }
              if (id.includes('vue')) {
                return 'vue-framework'
              }
              if (id.includes('nuxt')) {
                return 'nuxt-framework'
              }
            }
          },
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },
  fonts: {
    families: [
      {
        name: 'Lato',
        display: 'swap',
        preload: true,
        global: true,
        provider: 'google',
        weights: [100, 300, 400, 700, 900],
      },
      {
        name: 'Roboto',
        provider: 'google',
        weights: [400, 500, 700],
      },
    ],
  },
  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
    ],
    defaultLocale: 'fr',
    baseUrl: 'https://www.ciedesoreilles.fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  pwa: {
    devOptions: {
      enabled: import.meta.env.PWA_ENABLED === 'true',
      suppressWarnings: true,
      type: 'module',
      navigateFallbackAllowlist: [/^\/$/],
    },
    registerType: 'autoUpdate',
    manifest: {
      id: '/',
      start_url: '/',
      dir: 'ltr',
      lang: 'fr',
      name: 'Cie des Oreilles',
      short_name: 'Cie des Oreilles',
      description: 'Site de la Compagnie des Oreilles',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      display: 'fullscreen',
      orientation: 'portrait',
      handle_links: 'auto',
      prefer_related_applications: false,
      launch_handler: {
        client_mode: 'auto',
      },
      display_override: ['window-controls-overlay'],
      edge_side_panel: {
        preferred_width: 1,
      },
      categories: ['productivity', 'social', 'entertainment', 'news'],
      icons: [
        {
          src: '/pwa/icons/pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: '/pwa/icons/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa/icons/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa/icons/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icons/maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      protocol_handlers: [
        {
          protocol: 'web+ciedesoreilles',
          url: '/%s',
        },
        {
          protocol: 'web+ciedesoreillestype',
          url: '/?type=%s',
        },
      ],
      file_handlers: [
        {
          action: '/open-document',
          accept: {
            'application/pdf': ['.pdf'],
          },
        },
        {
          action: '/open-image',
          accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/webp': ['.webp'],
            'image/svg+xml': ['.svg'],
            'image/x-icon': ['.ico'],
            'image/gif': ['.gif'],
            'image/tiff': ['.tiff'],
            'image/bmp': ['.bmp'],
          },
        },
        {
          action: '/open-audio',
          accept: {
            'audio/wav': ['.wav'],
            'audio/mpeg': ['.mp3'],
            'audio/mp4': ['.mp4'],
            'audio/flac': ['.flac'],
            'audio/midi': ['.mid', '.midi'],
            'audio/aac': ['.aac'],
            'audio/ogg': ['.ogg'],
            'audio/x-m4a': ['.m4a'],
            'audio/x-aiff': ['.aiff'],
          },
        },
        {
          action: '/open-music-score',
          accept: {
            'application/vnd.recordare.musicxml': ['.musicxml'],
            'application/vnd.recordare.musicxml+xml': ['.mxl'],
          },
        },
        {
          action: '/open-archive',
          accept: {
            'application/zip': ['.zip'],
          },
        },
      ],
      shortcuts: [
        {
          name: 'Cie des Oreilles',
          short_name: 'Cie des Oreilles',
          description: 'Site de la Compagnie des Oreilles',
          url: '/',
          icons: [
            {
              src: '/pwa/icons/pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: '/pwa/icons/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa/icons/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      ],
      share_target: {
        action: '/share',
        method: 'POST',
        enctype: 'multipart/form-data',
        params: {
          title: 'title',
          text: 'text',
          url: 'url',
          files: [
            {
              name: 'media',
              accept: ['audio/*', 'image/*', 'application/pdf'],
            },
          ],
        },
      },
      screenshots: [
        {
          src: '/pwa/screenshot/mobile-1.png',
          type: 'image/png',
          sizes: '402x642',
          form_factor: 'narrow',
        },
        {
          src: '/pwa/screenshot/desktop-1.png',
          type: 'image/png',
          sizes: '1852x752',
          form_factor: 'wide',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      sourcemap: true,
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      clientsClaim: true,
    },
    client: {
      installPrompt: true,
    },
  },
  schemaOrg: {
    identity: defineOrganization({
      name: 'Cie des Oreilles',
      logo: '/logo.png',
      url: 'https://www.ciedesoreilles.fr',
    }),
  },
  supabase: {
    redirect: false,
  },
})

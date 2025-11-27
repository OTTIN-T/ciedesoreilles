export default defineAppConfig({
  ui: {
    colors: {
      primary: 'medieval',
      neutral: 'stone',
      admin: 'admin',
    },
    input: {
      compoundVariants: [
        {
          color: 'primary',
          variant: 'outline',
          class: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500',
        },
      ],
    },
    textarea: {
      compoundVariants: [
        {
          color: 'primary',
          variant: 'outline',
          // class: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500'
        },
      ],
    },
    formField: {
      slots: {
        label: 'text-gray-900 font-medium',
      },
    },
  },
})

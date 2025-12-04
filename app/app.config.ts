export default defineAppConfig({
  ui: {
    colors: {
      primary: 'primary',
      neutral: 'slate',
      admin: 'admin',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
    },
    card: {
      slots: {
        root: 'bg-bg',
      },
    },
    // input: {
    //   compoundVariants: [
    //     {
    //       color: 'primary',
    //       variant: 'outline',
    //       class: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500',
    //     },
    //   ],
    // },
    // textarea: {
    //   compoundVariants: [
    //     {
    //       color: 'primary',
    //       variant: 'outline',
    //       // class: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500'
    //     },
    //   ],
    // },
    // formField: {
    //   slots: {
    //     label: 'text-gray-900 font-medium',
    //   },
    // },
  },
})

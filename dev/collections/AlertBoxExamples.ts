import type { CollectionConfig } from 'payload'

import { AlertBoxField } from '@nouance/payload-better-fields-plugin/AlertBox'

export const AlertBoxExamples: CollectionConfig = {
  slug: 'alertBoxExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...AlertBoxField({
      config: {
        type: 'info',
        icon: {
          enable: true,
        },
        message: 'Please be aware that the title is required for the mobile app.',
      },
      overrides: {
        name: 'titleRequiredUI',
        admin: {
          condition: (data, siblingData) => !siblingData.title,
        },
      },
    }),
    ...AlertBoxField({
      config: {
        type: 'alert',
        message: 'Please contact reception before changing this page.',
      },
      overrides: {
        name: 'alertBox',
      },
    }),

    ...AlertBoxField({
      config: {
        type: 'error',
        message: "Systems are currently down and it's the weekend.",
      },
      overrides: {
        name: 'errorBox',
      },
    }),
    ...AlertBoxField({
      config: {
        type: 'alert',
        icon: {
          enable: true,
        },
        message: "Important notice for the Ice Cream machine: it's out of order.",
      },
      overrides: {
        name: 'icecreamNotice',
      },
    }),
  ],
}

import type { CollectionConfig } from 'payload'

import { SlugField } from '@nouance/payload-better-fields-plugin/Slug'

export const SlugExamples: CollectionConfig = {
  slug: 'slugExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...SlugField('title'),
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
}

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { ComboExamples } from 'collections/ComboExamples.js'
import { PatternExamples } from 'collections/PatternExamples.js'
import { RangeExamples } from 'collections/RangeExamples.js'
import { SlugExamples } from 'collections/SlugExamples.js'
import { TelephoneExamples } from 'collections/TelephoneExamples.js'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { AlertBoxExamples } from './collections/AlertBoxExamples.js'
import { ColourPickerExamples } from './collections/ColourPickerExamples.js'
import { ColourTextExamples } from './collections/ColourTextExamples.js'
import { NumberExamples } from './collections/NumberExamples.js'
import { Users } from './collections/Users.js'
import { seed } from './seed.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.ROOT_DIR) {
  process.env.ROOT_DIR = dirname
}

// eslint-disable-next-line no-restricted-exports
export default buildConfig({
  admin: {
    autoLogin: process.env.AUTO_LOGIN_EMAIL
      ? { email: process.env.AUTO_LOGIN_EMAIL, password: process.env.AUTO_LOGIN_PASSWORD }
      : undefined,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    AlertBoxExamples,
    ColourPickerExamples,
    ColourTextExamples,
    NumberExamples,
    TelephoneExamples,
    SlugExamples,
    RangeExamples,
    PatternExamples,
    ComboExamples,
    Users,
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  editor: lexicalEditor(),
  onInit: async (payload) => {
    await seed(payload)
  },
  plugins: [],
  secret: process.env.PAYLOAD_SECRET || 'test-secret_key',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

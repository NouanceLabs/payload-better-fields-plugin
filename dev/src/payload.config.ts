import { buildConfig } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import SlugExamples from './collections/SlugExamples'
import ComboExamples from './collections/ComboExamples'
import NumberExamples from './collections/NumberExamples'
import PatternExamples from './collections/PatternExamples'

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
    webpack: config => {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...(config?.resolve?.alias || {}),
            react: path.join(__dirname, '../node_modules/react'),
            'react-dom': path.join(__dirname, '../node_modules/react-dom'),
            payload: path.join(__dirname, '../node_modules/payload'),
          },
        },
      }
      return newConfig
    },
  },
  collections: [SlugExamples, ComboExamples, NumberExamples, PatternExamples, Users],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [],
})

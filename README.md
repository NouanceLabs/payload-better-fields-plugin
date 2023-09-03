# Better fields plugin (beta)

This plugin aims to provide you with very specific and improved fields for the admin panel.  
We've tried to keep styling as consistent as possible with the existing admin UI, however if there are any issues please report them!

Every field will come with its own usage instructions and structure. These are subject to change!

## Installation

```bash
  yarn add @nouance/payload-better-fields-plugin
  # OR
  npm i @nouance/payload-better-fields-plugin
```

## Fields

- [Slug field](#slug-field)

- [Combo field](#combo-field)

## Slug field

![slugField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/c12c522a-c5c9-49ca-8998-c8ca3eba60bc)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { SlugField } from '@nouance/payload-better-fields-plugin'

const Examples: CollectionConfig = {
  slug: 'examples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...SlugField(['title'], undefined, {
      admin: {
        position: 'sidebar',
      },
    }),
  ],
}
```

### Options

The `SlugField` accepts the following parameters, all are optional

- `fieldToUse` - `string[]` `@default ['title']`

- `slugifyOptions` - Options to be passed to the [slugify](https://www.npmjs.com/package/slugify) function

```ts
@default
{ lower: true, remove: /[*+~.()'"!?#\.,:@]/g }
```

- `slugOverrides` - `TextField` Slug field overrides, use this to rename the machine name or label of the field

- `enableEditSlug` - `boolean` `@default true` Enable or disable the checkbox field

- `editSlugOverrides` - `CheckboxField` `@default ['title']` Checkbox field overrides

## Combo field

![comboField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/cbe90336-197b-4372-b267-5a453bfdcc5e)


### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { ComboField } from '@nouance/payload-better-fields-plugin'

const Examples: CollectionConfig = {
  slug: 'examples',
  admin: {
    useAsTitle: 'fullName',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
      ],
    },
    ...ComboField(['firstName', 'lastName'], { name: 'fullName' }),
  ],
}
```

### Options

The `ComboField` accepts the following parameters, all are optional

- `fieldToUse` - `string[]` required

- `overrides` - `TextField` required for name attribute

- `options`

  - `separator` - `string` `@default ' '`

  - `initial` - `string` The starting string value before all fields are concatenated

  - `callback` - `(value: string) => string` You can apply a callback to modify each field value if you want to preprocess them

## Contributing

For development purposes, there is a full working example of how this plugin might be used in the [dev](./dev) directory of this repo.

```bash
git clone git@github.com:NouanceLabs/payload-better-fields-plugin.git \
  cd payload-better-fields-plugin && yarn \
  cd demo && yarn \
  cp .env.example .env \
  vim .env \ # add your payload details
  yarn dev
```

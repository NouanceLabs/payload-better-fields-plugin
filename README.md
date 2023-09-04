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
- [Number field](#number-field)
- [Pattern field](#pattern-field)

## Styling

We've tried to re-use the internal components of Payload as much as possible. Where we can't we will re-use the CSS variables used in the core theme to ensure as much compatibility with user customisations.

If you want to further customise the CSS of these components, every component comes with a unique class wrapper in the format of `bf<field-name>Wrapper`, eg `bfPatternFieldWrapper`, to help you target these inputs consistently.

## Slug field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/Slug)

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

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/Combo)

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

## Number field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/Number) | [react-number-format NumericFormat](https://s-yadav.github.io/react-number-format/docs/numeric_format)

![numberField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/0edbcbad-116a-4fcb-b44f-837a32ffa80a)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { NumberField } from '@nouance/payload-better-fields-plugin'

const Examples: CollectionConfig = {
  slug: 'examples',
  admin: {
    useAsTitle: 'fullName',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...NumberField(
          {
            prefix: '$ ',
            thousandSeparator: ',',
            decimalScale: 2,
            fixedDecimalScale: true,
          },
          {
            name: 'price',
            required: true,
          },
        ),
  ],
}
```

### Options

The `NumberField` accepts the following parameters, all are optional

- `format` - `NumericFormatProps` required accepts props for [NumericFormat](https://s-yadav.github.io/react-number-format/docs/numeric_format)

  - `callback` - you can override the internal callback on the value, the `value` will be a string so you need to handle the conversion to an int or float yourself via parseFloat

  ```ts
  // example
  callback: (value) => parseFloat(value) + 20,
  ```

- `overrides` - `NumberField` required for name attribute

## Pattern field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/Pattern) | [react-number-format PatternFormat](https://s-yadav.github.io/react-number-format/docs/pattern_format)

![patternField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/332597f3-1c99-4657-972c-223f0ea06ea8)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { PatternField } from '@nouance/payload-better-fields-plugin'

const Examples: CollectionConfig = {
  slug: 'examples',
  admin: {
    useAsTitle: 'fullName',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...PatternField(
      {
        format: '+1 (###) #### ###',
        prefix: '% ',
        allowEmptyFormatting: true,
        mask: '_',
      },
      {
        name: 'telephone',
        type: 'text',
        required: false,
        admin: {
          placeholder: '% 20',
        },
      },
    ),
  ],
}
```

### Options

The `PatternField` accepts the following parameters, all are optional

- `format` - `PatternFormatProps` required accepts props for [PatternFormat](https://s-yadav.github.io/react-number-format/docs/pattern_format)

  - `format` required input for the pattern to be applied

  - `callback` - you can override the internal callback on the value, the `value` will be a string so you need to handle the conversion to an int or float yourself via parseFloat

  ```ts
  // example
  callback: (value) => value + 'ID',
  ```

- `overrides` - `TextField` required for name attribute

### Notes

We recommend using a text field in Payload.

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

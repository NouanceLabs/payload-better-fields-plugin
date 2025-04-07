# Better fields plugin

This plugin aims to provide you with very specific and improved fields for the admin panel.  
We've tried to keep styling as consistent as possible with the existing admin UI, however if there are any issues please report them!

Every field will come with its own usage instructions and structure. These are subject to change!

## ⚠️ Breaking changes 2.0 release ⚠️

**All fields have been changed for how they are imported.** You will also need to install dependencies directly yourself. This should streamline the bundle size a lot especially for unused fields.

## Payload compatibility

| Payload | Better fields |
| ------- | ------------- |
| 1.x     | < 1.0         |
| 2.x     | > 1.0         |
| 3.x     | > 2.0         |

## Installation

```bash
  pnpm add @nouance/payload-better-fields-plugin
  # OR
  npm i @nouance/payload-better-fields-plugin
```

## Fields

- [Slug field](#slug-field)
- [Combo field](#combo-field)
- [Number field](#number-field)
- [Pattern field](#pattern-field)
- [Range field](#range-field)
- [Colour Text field](#colour-text-field)
- [Telephone field](#telephone-field)
- [Alert Box field](#alert-box-field)
- [Colour Picker field](#colour-picker-field)
- [Date field](#date-field)

## Styling

We've tried to re-use the internal components of Payload as much as possible. Where we can't we will re-use the CSS variables used in the core theme to ensure as much compatibility with user customisations.

If you want to further customise the CSS of these components, every component comes with a unique class wrapper in the format of `bf<field-name>Wrapper`, eg `bfPatternFieldWrapper`, to help you target these inputs consistently.

## Slug field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/Slug)

![slugField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/c12c522a-c5c9-49ca-8998-c8ca3eba60bc)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { SlugField } from '@nouance/payload-better-fields-plugin/Slug'

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
    ...SlugField(
      {
        name: 'slug',
        admin: {
          position: 'sidebar',
        },
      },
      {
        useFields: ['title', 'subtitle'],
      },
    ),
  ],
}
```

### Options

The `SlugField` accepts the following parameters

- `fieldsToUse` - `string` defaults to `'title'`

- `overrides`

  - `slugOverrides` - `TextField` required Textfield overrides

  - `checkboxOverrides` - `CheckboxField` | Checkbox field overrides

Here is a more full example:

```ts
...SlugField('title'),
```

### Notes

`index` and `unique` are set to true by default

## Combo field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/Combo)

![comboField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/cbe90336-197b-4372-b267-5a453bfdcc5e)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { ComboField } from '@nouance/payload-better-fields-plugin/Combo'

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

The `ComboField` accepts the following parameters

- `overrides` - `TextField` **required** for name attribute

- `fieldToUse` - `string[]` **required**

- `options`

  - `separator` - `string` defaults to `' '`

  - `initial` - `string` The starting string value before all fields are concatenated

Removed options:

- `callback` - `(value: string) => string` You can apply a callback to modify each field value if you want to preprocess them

## Number field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/Number) | [react-number-format NumericFormat](https://s-yadav.github.io/react-number-format/docs/numeric_format)

![numberField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/0edbcbad-116a-4fcb-b44f-837a32ffa80a)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { NumberField } from '@nouance/payload-better-fields-plugin/Number'

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
        name: 'price',
        required: true,
      },
      {
        prefix: '$ ',
        suffix: ' %',
        thousandSeparator: ',',
        decimalScale: 2,
        fixedDecimalScale: true,
      },
    ),
  ],
}
```

### Options

The `NumberField` accepts the following parameters

- `overrides` - `NumberField` **required** for name attribute

- `format` - `NumericFormatProps` **required**, accepts props for [NumericFormat](https://s-yadav.github.io/react-number-format/docs/numeric_format)

  - `callback` - you can override the internal callback on the value, the `value` will be a string so you need to handle the conversion to an int or float yourself via parseFloat

  ```ts
  // example
  callback: (value) => parseFloat(value) + 20,
  ```

## Pattern field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/Pattern) | [react-number-format PatternFormat](https://s-yadav.github.io/react-number-format/docs/pattern_format)

![patternField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/332597f3-1c99-4657-972c-223f0ea06ea8)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { PatternField } from '@nouance/payload-better-fields-plugin/Pattern'

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
        name: 'telephone',
        type: 'text',
        required: false,
        admin: {
          placeholder: '% 20',
        },
      },
      {
        format: '+1 (###) #### ###',
        prefix: '% ',
        allowEmptyFormatting: true,
        mask: '_',
      },
    ),
  ],
}
```

### Options

The `PatternField` accepts the following parameters

- `overrides` - `TextField` **required** for name attribute

- `format` - `PatternFormatProps` **required**, accepts props for [PatternFormat](https://s-yadav.github.io/react-number-format/docs/pattern_format)

  - `format` **required**, input for the pattern to be applied

  - `callback` - you can override the internal callback on the value, the `value` will be a string so you need to handle the conversion to an int or float yourself via parseFloat

  ```ts
  // example
  callback: (value) => value + 'ID',
  ```

### Notes

We recommend using a text field in Payload.

## Range field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/Range)

![rangeField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/f42d20dd-8d1f-47f4-b31b-eefc6b446163)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { RangeField } from '@nouance/payload-better-fields-plugin/Range'

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
    ...RangeField(
      {
        name: 'groups',
      },
      { min: 5, max: 200, step: 5 },
    ),
  ],
}

export default Examples
```

### Options

The `RangeField` accepts the following parameters

- `overrides` - `NumberField` **required** for name attribute

- `config` - **required**

  - `min` - `number` defaults to 1

  - `max` - `number` defaults to 100

  - `step` - `number` defaults to 1

  - `showPreview` - `boolean` defaults to false, shows a preview box of the underlying selected value, `n/a` for null

  - `markers` - `NumberMarker[]` array of markers to be visually set, accepts an optional label

    - `{ value: number, label?: string}[]`

## Colour Text field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/ColourText) | [validate-color](https://github.com/dreamyguy/validate-color)

![colourTextField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/0ffce2e4-f628-44a0-acac-127cf1f396a8)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { ColourTextField } from '@nouance/payload-better-fields-plugin/ColourText'

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
    ...ColourTextField({
      name: 'colour',
    }),
  ],
}

export default Examples
```

### Options

The `ColourTextField` accepts the following parameters

- `overrides` - `TextField` **required** for name attribute

## Telephone field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/Telephone) | [react-phone-number-input](https://www.npmjs.com/package/react-phone-number-input)

![telephoneField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/843ca83b-79e4-47ba-8234-83de41400140)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { TelephoneField } from '@nouance/payload-better-fields-plugin/Telephone'

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
    ...TelephoneField({
      name: 'telephone',
      admin: {
        placeholder: '+1 2133 734 253',
      },
    }),
  ],
}

export default Examples
```

### Options

The `TelephoneField` accepts the following parameters

- `overrides` - `TextField` **required** for `name` attribute

- `config` - `Config` optional, allows for overriding attributes in the phone field

  - `international` defaults to `true` | Forces international formatting

  - `defaultCountry` accepts a 2-letter country code eg. `'US'` | If defaultCountry is specified then the phone number can be input both in "international" format and "national" format

  - `country` accepts a 2-letter country code eg. `'US'` | If country is specified then the phone number can only be input in "national" (not "international") format

  - `initialValueFormat` If an initial value is passed, and initialValueFormat is "national", then the initial value is formatted in national format

  - `withCountryCallingCode` If country is specified and international property is true then the phone number can only be input in "international" format for that country

  - `countryCallingCodeEditable`

  - `smartCaret` When the user attempts to insert a digit somewhere in the middle of a phone number, the caret position is moved right before the next available digit skipping any punctuation in between

  - `useNationalFormatForDefaultCountryValue` When defaultCountry is defined and the initial value corresponds to defaultCountry, then the value will be formatted as a national phone number by default

  - `countrySelectProps`

    - `unicodeFlags` defaults to `false` | Set to `true` to render Unicode flag icons instead of SVG images

## Alert Box field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/AlertBox)

![alertBoxField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/f6fabbda-00cc-40bc-8a0b-3c0024951188)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { AlertBoxField } from '@nouance/payload-better-fields-plugin/AlertBox'

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
    ...AlertBoxField(
      {
        name: 'alert',
      },
      {
        type: 'info',
        message: 'Please be aware that the title is required for the mobile app.',
      },
    ),
  ],
}

export default Examples
```

### Options

The `AlertBoxField` accepts the following parameters

- `overrides` - `UIField` **required** for `name` attribute

- `config` - `Config` required

  - `type` - a selection of `info` | `alert` | `error` which come with different styles

  - `message` - required string

  - `className` - optional string to help you style individual alerts better

  - `icon` - optional, default is enabled

    - `enable` - boolean, turn off the icon

    - `Element` - React component to override the provided icon

If you want to make this field appear conditionally, you should use the field's [admin conditional config](https://payloadcms.com/docs/fields/overview#conditional-logic) as provided by Payload.

## Colour Picker field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/ColourPicker)

![colourPickerField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/bb8f4dc1-de96-4705-9955-fe73786ee613)

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { ColourPickerField } from '@nouance/payload-better-fields-plugin/ColourPicker'

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
    ...ColourPickerField(
      {
        name: 'backgroundColour',
        required: true,
      },
      {
        type: 'hslA',
      },
    ),
  ],
}

export default Examples
```

### Options

The `ColourPickerField` accepts the following parameters

- `overrides` - `TextField` **required** for `name` attribute

- `config` - `Config` required

  - `type` - defaults to `hex`, a selection of `hex` | `hexA` | `rgb` | `rgbA` | `hsl` | `hslA`

  - `expanded` - optional boolean, controls if the selector is visible by default

  - `showPreview` - optional boolean

## Date field

[source](https://github.com/NouanceLabs/payload-better-fields-plugin/tree/master/src/fields/Date)

![dateField](https://github.com/NouanceLabs/payload-better-fields-plugin/assets/35137243/6089bd5b-57bb-436e-9804-6d4a04d1aca0)

The goal of this field is to help with management of timezones.

### Usage

```ts
import { CollectionConfig } from 'payload/types'
import { DateField } from '@nouance/payload-better-fields-plugin/Date'

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
    ...DateField({
      name: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    }),
  ],
}

export default Examples
```

### Options

The `DateField` accepts the following parameters

- `overrides` - `DateField` **required** for `name` attribute

- `timezone` - `Timezone` optional

  - `enabled` - defaults to `true`

  - `timezones` - optional list of timezones to customise available options

  - `overrides` - `SelectField` **required** for `name` attribute

## Contributing

For development purposes, there is a full working example of how this plugin might be used in the [dev](./dev) directory of this repo.

```bash
git clone git@github.com:NouanceLabs/payload-better-fields-plugin.git \
  cd payload-better-fields-plugin && pnpm \
  cd demo && pnpm \
  cp .env.example .env \
  vim .env \ # add your payload details
  pnpm dev
```

## Contributors

Thanks to the following people for contributing code to this plugin

[Idan Yekutiel](https://github.com/idanyekutiel), [MarkAtOmniux](https://github.com/MarkAtOmniux), [Kalon Robson](https://github.com/kalon-robson)

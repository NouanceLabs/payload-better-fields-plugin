import React, { useMemo } from 'react'
import { Label, useField, useFormFields } from 'payload/components/forms'
import slugify from 'slugify'
import TextInputField from 'payload/dist/admin/components/forms/field-types/Text/Input'
import { CheckboxInput } from 'payload/dist/admin/components/forms/field-types/Checkbox/Input'
import { Props as TextFieldType } from 'payload/dist/admin/components/forms/field-types/Text/types'
import type { SlugifyOptions } from '../../types'
import type { CheckboxField } from 'payload/types'

import '../../styles/slug.scss'

type Props = TextFieldType & {
  path: string
  readOnly?: boolean
  placeholder?: string
  className?: string
  custom: {
    watchFields: string[]
    slugifyOptions?: SlugifyOptions
    editFieldConfig: CheckboxField
    enableEditSlug: boolean
  }
}

const SlugComponent: React.FC<Props> = ({
  readOnly,
  className,
  required,
  path,
  placeholder,
  label,
  admin,
  custom,
  ...others
}) => {
  const { watchFields, slugifyOptions, editFieldConfig, enableEditSlug } = custom
  const { value, setValue, showError, errorMessage } = useField<Props>({ path })

  const checkboxPath = path.includes('.')
    ? path.slice(0, path.lastIndexOf('.')) + '.' + editFieldConfig.name
    : editFieldConfig.name

  const editSlugField = useField<Props>({ path: checkboxPath })

  const classes = [
    'field-type',
    'text',
    className,
    showError && 'error',
    readOnly && 'read-only',
    'container',
  ]
    .filter(Boolean)
    .join(' ')

  const fields = useFormFields(([fields, dispatch]) => {
    return watchFields.map(watch => fields[watch])
  })

  const isRequired = required
  const isReadonly = readOnly || !Boolean(editSlugField.value)

  const processedValue = useMemo(() => {
    const separator = slugifyOptions?.replacement ?? '-'

    return fields
      .filter(item => Boolean(item.value))
      .reduce((accumulator, currentValue, currentIndex) => {
        return (
          String(accumulator) +
          (currentIndex > 0 ? separator : '') +
          slugify(String(currentValue.value), slugifyOptions)
        )
      }, '')
  }, [fields])

  React.useEffect(() => {
    if (isReadonly) {
      /* @ts-expect-error */
      if (processedValue !== value) {
        setValue(processedValue)
      }
    }
  }, [isReadonly, processedValue])

  const handleCheckbox: React.FormEventHandler<HTMLInputElement> = e => {
    editSlugField.setValue(!Boolean(editSlugField.value))
    e.stopPropagation()
  }

  return (
    <div className={`bfSlugFieldWrapper`}>
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={label} required={isRequired} />
      <div className={classes}>
        <TextInputField
          path={path}
          name={others.name}
          label={false}
          required={isRequired}
          readOnly={isReadonly}
          onChange={e => {
            setValue(e.target.value)
          }}
          className={'slugInput'}
          /* @ts-expect-error */
          value={value}
          showError={showError}
          errorMessage={errorMessage}
          style={{
            marginBottom: 0,
          }}
        />
        <div className={'checkbox'}>
          <div className={'srOnly'}>
            <Label
              htmlFor={`field-${checkboxPath.replaceAll('.', '-')}`}
              label={editFieldConfig?.label ?? ''}
            />
          </div>
          <CheckboxInput
            id={`field-${checkboxPath.replaceAll('.', '-')}`}
            onToggle={handleCheckbox}
            defaultChecked={editSlugField.value}
            /* @ts-expect-error */
            checked={editSlugField.value ?? false}
            label={''}
            name={checkboxPath}
          />
        </div>
      </div>
    </div>
  )
}

export default SlugComponent

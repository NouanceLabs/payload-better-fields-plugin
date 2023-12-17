import React, { useMemo } from 'react'
import { Label, useField, useFormFields } from 'payload/components/forms'
import TextInputField from 'payload/dist/admin/components/forms/field-types/Text/Input'
import type { Props as TextFieldType } from 'payload/dist/admin/components/forms/field-types/Text/types'
import type { Config } from '.'
import FieldDescription from 'payload/dist/admin/components/forms/FieldDescription'

type Props = TextFieldType & {
  path: string
  readOnly?: boolean
  placeholder?: string
  className?: string
  custom: {
    watchFields: string[]
    options: Config
  }
}

const ComboComponent: React.FC<Props> = ({
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
  const { watchFields, options } = custom
  const { value, setValue, showError, errorMessage } = useField<Props>({ path })
  const beforeInput = admin?.components?.beforeInput
  const afterInput = admin?.components?.afterInput

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
  const isReadonly = readOnly || admin?.readOnly

  const processedValue = useMemo(() => {
    const separator = options?.separator ?? ' '

    return fields
      .filter(item => Boolean(item.value))
      .reduce((accumulator, currentValue, currentIndex) => {
        const value = options.callback
          ? options.callback(String(currentValue.value))
          : String(currentValue.value)

        return String(accumulator) + (currentIndex > 0 ? separator : '') + value
      }, options.initial)
  }, [fields, custom])

  React.useEffect(() => {
    /* @ts-expect-error */
    if (processedValue !== value) {
      setValue(processedValue)
    }
  }, [processedValue])

  return (
    <div className={`bfComboFieldWrapper field-type`}>
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={label} required={isRequired} />
      <div className={classes}>
        {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
        <TextInputField
          path={path}
          name={others.name}
          label={false}
          required={isRequired}
          readOnly={isReadonly}
          onChange={e => {
            setValue(e.target.value)
          }}
          className={'comboInput'}
          /* @ts-expect-error */
          value={value}
          showError={showError}
          errorMessage={errorMessage}
          style={{
            marginBottom: 0,
          }}
        />
        {Array.isArray(afterInput) && afterInput.map((Component, i) => <Component key={i} />)}
      </div>
      <FieldDescription
        className={`field-description-${path.replace(/\./g, '__')}`}
        description={admin?.description}
        value={value}
      />
    </div>
  )
}

export default ComboComponent

import React, { useMemo } from 'react'
import { Label, useField, useFormFields } from 'payload/components/forms'
import TextInputField from 'payload/dist/admin/components/forms/field-types/Text/Input'
import { Props as TextFieldType } from 'payload/dist/admin/components/forms/field-types/Text/types'
import { Config } from '.'

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
    setValue(processedValue)
  }, [isReadonly, processedValue])

  return (
    <div className={`bfComboFieldWrapper`}>
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
          className={'comboInput'}
          /* @ts-expect-error */
          value={value}
          showError={showError}
          errorMessage={errorMessage}
          style={{
            marginBottom: 0,
          }}
        />
      </div>
    </div>
  )
}

export default ComboComponent

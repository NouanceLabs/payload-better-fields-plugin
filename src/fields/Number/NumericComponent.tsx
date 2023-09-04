import React, { useCallback, useMemo } from 'react'
import { Label, useField, useFormFields } from 'payload/components/forms'
import Error from 'payload/dist/admin/components/forms/Error'
import { NumericFormat } from 'react-number-format'
import { TextField, NumberField } from 'payload/types'
import { NumericConfig } from '.'

import '../../styles/slug.scss'

type Props = (NumberField | TextField) & {
  path: string
  readOnly?: boolean
  placeholder?: string
  className?: string
  custom: {
    format: NumericConfig
  }
}

const NumericComponent: React.FC<Props> = ({
  readOnly,
  className,
  required,
  path,
  label,
  admin,
  custom,
  type,
  ...others
}) => {
  const { format } = custom
  const { value, setValue, showError, errorMessage } = useField<Props>({ path })
  const placeholder = admin?.placeholder

  const formatValue = useCallback(
    (value: string) => {
      const prefix = format.prefix
      const suffix = format.suffix

      if (type === 'number') {
        let cleanValue: string | number = value

        if (prefix) cleanValue = cleanValue.replaceAll(prefix, '')

        if (suffix) cleanValue = cleanValue.replaceAll(suffix, '')

        cleanValue = parseFloat(cleanValue)

        return cleanValue
      } else {
        return value
      }
    },
    [type, format],
  )

  const classes = [
    'field-type',
    'text',
    className,
    showError && 'error',
    readOnly && 'read-only',
    format.component,
    'container',
  ]
    .filter(Boolean)
    .join(' ')

  const isRequired = required
  const isReadonly = readOnly || admin?.readOnly

  return (
    <div className={`bfNumericFieldWrapper`}>
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={label} required={isRequired} />
      <div className={classes}>
        <Error showError={showError} message={errorMessage ?? ''} />
        <NumericFormat
          onChange={e => {
            setValue(formatValue(e.target.value))
          }}
          // @ts-expect-error
          value={value}
          id={`field-${path.replace(/\./gi, '__')}`}
          name={path}
          required={isRequired}
          readOnly={isReadonly}
          className="numberInput"
          placeholder={typeof placeholder === 'string' ? placeholder : ''}
          {...format}
        />
      </div>
    </div>
  )
}

export default NumericComponent

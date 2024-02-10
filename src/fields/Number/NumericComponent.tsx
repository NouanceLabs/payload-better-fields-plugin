import React, { useCallback, useMemo } from 'react'
import { Label, useField, useFormFields } from 'payload/components/forms'
import Error from 'payload/dist/admin/components/forms/Error'
import { NumericFormat } from 'react-number-format'
import { TextField, NumberField } from 'payload/types'
import { NumericConfig } from '.'
import FieldDescription from 'payload/dist/admin/components/forms/FieldDescription'

import '../../styles/slug.scss'

type Props = (NumberField | TextField) & {
  path: string
  readOnly?: boolean
  placeholder?: string
  className?: string
  custom: {
    config: NumericConfig
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
  const { config } = custom
  const { value, setValue, showError, errorMessage } = useField<Props>({ path })
  const placeholder = admin?.placeholder
  const beforeInput = admin?.components?.beforeInput
  const afterInput = admin?.components?.afterInput
  const { callback, ...componentProps } = config

  console.log('componentProps', componentProps)

  const formatValue = useCallback(
    (value: string) => {
      const prefix = componentProps.prefix
      const suffix = componentProps.suffix
      const thousandSeparator = componentProps.thousandSeparator

      if (callback) {
        return callback(value)
      } else {
        if (type === 'number') {
          let cleanValue: string | number = value

          if (prefix) cleanValue = cleanValue.replaceAll(prefix, '')

          if (suffix) cleanValue = cleanValue.replaceAll(suffix, '')

          if (thousandSeparator) {
            cleanValue =
              typeof thousandSeparator === 'string'
                ? cleanValue.replaceAll(thousandSeparator, '')
                : cleanValue.replaceAll(',', '')
          }

          return cleanValue
        } else {
          return value
        }
      }
    },
    [type, componentProps, callback],
  )

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

  const isRequired = required
  const isReadonly = readOnly || admin?.readOnly

  return (
    <div className={`bfNumericFieldWrapper field-type`}>
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={label} required={isRequired} />
      <div className={classes}>
        <Error showError={showError} message={errorMessage ?? ''} />
        {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
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
          {...componentProps}
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

export default NumericComponent

import React, { useCallback, useMemo } from 'react'
import { Label, useField, useFormFields } from 'payload/components/forms'
import Error from 'payload/dist/admin/components/forms/Error'
import { PatternFormat } from 'react-number-format'
import { TextField, NumberField } from 'payload/types'
import { PatternConfig } from '.'
import FieldDescription from 'payload/dist/admin/components/forms/FieldDescription'

import '../../styles/slug.scss'

type Props = (NumberField | TextField) & {
  path: string
  readOnly?: boolean
  placeholder?: string
  className?: string
  custom: {
    config: PatternConfig
  }
}

const PatternComponent: React.FC<Props> = ({
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

  const formatValue = useCallback(
    (value: string) => {
      const prefix = componentProps.prefix

      if (callback) {
        return callback(value)
      }

      if (type === 'number') {
        let cleanValue: string | number = value

        if (prefix) cleanValue = cleanValue.replaceAll(prefix, '')

        cleanValue = parseFloat(cleanValue)

        return cleanValue
      } else {
        return value
      }
    },
    [type, callback, componentProps],
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
    <div className={`bfPatternFieldWrapper field-type`}>
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={label} required={isRequired} />
      <div className={classes}>
        <Error showError={showError} message={errorMessage ?? ''} />
        {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
        <PatternFormat
          onChange={e => {
            setValue(formatValue(e.target.value))
          }}
          // @ts-expect-error
          value={value}
          id={`field-${path.replace(/\./gi, '__')}`}
          name={path}
          required={isRequired}
          readOnly={isReadonly}
          className="patternInput"
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

export default PatternComponent

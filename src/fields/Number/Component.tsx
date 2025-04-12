'use client'

import type { NumberFieldClientProps, TextFieldClientProps } from 'payload'

import { FieldDescription, FieldError, FieldLabel, RenderCustomComponent, useField } from '@payloadcms/ui'
import React, { useCallback } from 'react'
import { NumericFormat } from 'react-number-format'

import type { Config } from './index.js'

import './styles.css'

type Props = {
  className?: string
  config: Config
  path: string
  placeholder?: string
  readOnly?: boolean
} & (NumberFieldClientProps | TextFieldClientProps)

export const NumberComponent: React.FC<Props> = (props) => {
  const { config, field, path, readOnly, validate } = props

  const { type, admin: { className, description, placeholder, readOnly: adminReadOnly } = {}, label, required } = field

  const memoizedValidate = useCallback(
    (value: number[] & string, options: any) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, required })
      }
    },
    [validate, required],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Label } = {},
    errorMessage,
    setValue,
    showError,
    value,
  } = useField<string>({
    path,
    // @ts-expect-error - memoizedValidate is not typed
    validate: memoizedValidate,
  })

  const { ...componentProps } = config

  const formatValue = useCallback(
    (value: string) => {
      const prefix = componentProps.prefix
      const suffix = componentProps.suffix
      const thousandSeparator = componentProps.thousandSeparator

      if (type === 'number') {
        let cleanValue: number | string = value

        if (prefix) {
          cleanValue = cleanValue.replaceAll(prefix, '')
        }

        if (suffix) {
          cleanValue = cleanValue.replaceAll(suffix, '')
        }

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
    },
    [type, componentProps],
  )

  const classes = ['field-type', 'text', className, showError && 'error', readOnly && 'read-only', 'container']
    .filter(Boolean)
    .join(' ')

  const isReadonly = Boolean(readOnly) || Boolean(adminReadOnly)

  return (
    <div className={`bfNumericFieldWrapper field-type`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} path={path} required={required} />}
      />

      {BeforeInput}

      <div className={classes}>
        <FieldError message={errorMessage ?? ''} showError={showError} />
        <NumericFormat
          className="numberInput"
          id={`field-${path.replace(/\./g, '__')}`}
          name={path}
          onChange={(e) => {
            setValue(formatValue(e.target.value))
          }}
          placeholder={typeof placeholder === 'string' ? placeholder : ''}
          readOnly={isReadonly}
          required={required}
          value={value}
          {...componentProps}
        />
      </div>

      <RenderCustomComponent
        CustomComponent={Description}
        Fallback={
          <FieldDescription
            className={`field-description-${path.replace(/\./g, '__')}`}
            description={description ?? ''}
            path={path}
          />
        }
      />

      {AfterInput}
    </div>
  )
}

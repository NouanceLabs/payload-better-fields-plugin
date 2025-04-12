'use client'
import type { NumberFieldClientProps, TextFieldClientProps } from 'payload'

import { FieldError as Error, FieldDescription, FieldLabel, RenderCustomComponent, useField } from '@payloadcms/ui'
import React, { useCallback } from 'react'
import { PatternFormat } from 'react-number-format'

import type { Config } from './index.js'

import './styles.css'

type Props = {
  className?: string
  config: Config
  path: string
  placeholder?: string
  readOnly?: boolean
} & (NumberFieldClientProps | TextFieldClientProps)

export const PatternComponent: React.FC<Props> = (props) => {
  const { config, field, path, readOnly, validate } = props

  const { type, admin: { className, description, placeholder, readOnly: adminReadOnly } = {}, label, required } = field

  const memoizedValidate = useCallback(
    (value: null | (number[] & string) | undefined, options: any) => {
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

  const classes = ['field-type', 'text', className, showError && 'error', readOnly && 'read-only', 'container']
    .filter(Boolean)
    .join(' ')

  const formatValue = useCallback(
    (value: string) => {
      const prefix = config.prefix

      if (type === 'number') {
        let cleanValue: number | string = value

        if (prefix) {
          cleanValue = cleanValue.replaceAll(prefix, '')
        }

        cleanValue = parseFloat(cleanValue)

        return cleanValue
      } else {
        return value
      }
    },
    [type, config.prefix],
  )

  const isReadonly = readOnly || adminReadOnly

  return (
    <div className={`bfPatternFieldWrapper field-type`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} path={path} required={required} />}
      />

      {BeforeInput}

      <div className={classes}>
        <PatternFormat
          className="patternInput"
          id={`field-${path.replace(/\./g, '__')}`}
          name={path}
          onChange={(e) => {
            setValue(formatValue(e.target.value))
          }}
          placeholder={typeof placeholder === 'string' ? placeholder : ''}
          readOnly={isReadonly}
          required={config.required}
          value={value}
          {...config}
        />

        <Error message={errorMessage ?? ''} showError={showError} />
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

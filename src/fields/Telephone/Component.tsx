'use client'

import 'react-phone-number-input/style.css'

import type { NumberFieldClientProps } from 'payload'

import { FieldDescription, FieldLabel, RenderCustomComponent, useField } from '@payloadcms/ui'
import { useCallback } from 'react'
import PhoneInput from 'react-phone-number-input'

import type { Config } from './index.js'

type Props = {
  className?: string
  config: Config
  path: string
  placeholder?: string
  readOnly?: boolean
} & NumberFieldClientProps

export const TelephoneComponent: React.FC<Props> = (props) => {
  const { config, field, path, readOnly, validate } = props

  const {
    admin: { className, description, placeholder, readOnly: adminReadOnly, style, width } = {},
    label,
    required,
  } = field

  const memoizedValidate = useCallback(
    (value: number & number[], options: any) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, required })
      }
    },
    [validate, required],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Label } = {},
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

  const isReadonly = Boolean(readOnly) || Boolean(adminReadOnly)

  return (
    <div className={`bfTelephoneFieldWrapper field-type`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} path={path} required={required} />}
      />

      {BeforeInput}

      <div className={classes}>
        <PhoneInput
          className="telephoneInput"
          id={`field-${path.replace(/\./g, '__')}`}
          name={path}
          onChange={(value) => {
            if (!value) {
              setValue(undefined)
            }
            setValue(value)
          }}
          placeholder={typeof placeholder === 'string' ? placeholder : ''}
          readOnly={isReadonly}
          required={required}
          style={{
            width,
            ...style,
          }}
          value={value}
          {...config}
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

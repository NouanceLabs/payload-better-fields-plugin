'use client'
import React, { MouseEventHandler, useCallback } from 'react'
import { useField } from '@payloadcms/ui/forms/useField'
import { FieldLabel as Label } from '@payloadcms/ui/forms/FieldLabel'
import { FieldError as Error } from '@payloadcms/ui/forms/FieldError'
import { NumberField } from 'payload/types'
import { Config } from '.'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { FieldDescription } from '@payloadcms/ui/forms/FieldDescription'

type Props = NumberField & {
  path: string
  readOnly?: boolean
  placeholder?: string
  className?: string
  custom: {
    config?: Config
  }
}

const TelephoneComponent: React.FC<Props> = ({
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
  const style = admin?.style
  const width = admin?.width

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
    <div className={`bfTelephoneFieldWrapper field-type`}>
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={label} required={isRequired} />
      <Error showError={showError} message={errorMessage ?? ''} />
      <div className="containerWrapper">
        <div className={classes}>
          {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
          <PhoneInput
            onChange={value => {
              if (!Boolean(value)) setValue(undefined)
              setValue(value)
            }}
            // @ts-expect-error
            value={value}
            id={`field-${path.replace(/\./gi, '__')}`}
            name={path}
            required={isRequired}
            readOnly={isReadonly}
            className="telephoneInput"
            style={{
              width: width,
              ...style,
            }}
            placeholder={typeof placeholder === 'string' ? placeholder : ''}
            {...config}
          />
          {Array.isArray(afterInput) && afterInput.map((Component, i) => <Component key={i} />)}
        </div>
      </div>
      <FieldDescription
        className={`field-description-${path.replace(/\./g, '__')}`}
        description={typeof admin?.description === 'string' ? admin?.description : ''}
        /* value={value} */
      />
    </div>
  )
}

export default TelephoneComponent

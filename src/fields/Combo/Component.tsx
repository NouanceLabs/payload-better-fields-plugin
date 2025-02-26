'use client'

import type { TextFieldClientProps } from 'payload'

import {
  FieldDescription,
  FieldError,
  FieldLabel,
  RenderCustomComponent,
  TextInput,
  useField,
  useFormFields,
} from '@payloadcms/ui'
import React, { useCallback, useMemo } from 'react'

import type { Config } from './index.js'

type Props = {
  className?: string
  config: {
    options: Config
    watchFields: string[]
  }
  path: string
  placeholder?: string
  readOnly?: boolean
} & TextFieldClientProps

export const ComboComponent: React.FC<Props> = (props) => {
  const { config, field, path, readOnly, validate } = props

  const { admin: { className, description, placeholder, readOnly: adminReadOnly } = {}, label, required } = field

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

  const classes = ['field-type', 'text', className, showError && 'error', readOnly && 'read-only', 'container']
    .filter(Boolean)
    .join(' ')

  const fields = useFormFields(([fields, dispatch]) => {
    return config.watchFields.map((watch) => fields[watch])
  })

  const processedValue = useMemo(() => {
    const separator = config.options?.separator ?? ' '

    return fields
      .filter((item) => Boolean(item.value))
      .reduce((accumulator, currentValue, currentIndex) => {
        const value = String(currentValue.value)

        return String(accumulator) + (currentIndex > 0 ? separator : '') + value
      }, config.options.initial)
  }, [fields, config])

  React.useEffect(() => {
    if (processedValue !== value) {
      setValue(processedValue)
    }
  }, [processedValue, value])

  const isReadonly = Boolean(readOnly) || adminReadOnly

  return (
    <div className={`bfComboFieldWrapper field-type`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} path={path} required={required} />}
      />

      {BeforeInput}

      <div className={classes}>
        <TextInput
          className={'comboInput'}
          Error={<FieldError message={errorMessage} />}
          label={undefined}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
          }}
          path={path}
          placeholder={(placeholder as string) ?? undefined}
          readOnly={isReadonly}
          required={required}
          showError={showError}
          style={{
            marginBottom: 0,
          }}
          value={value}
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

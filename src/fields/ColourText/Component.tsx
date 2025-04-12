'use client'

import type { TextFieldClientProps } from 'payload'

import {
  FieldDescription,
  FieldError,
  FieldLabel,
  RenderCustomComponent,
  TextInput as TextInputField,
  useField,
} from '@payloadcms/ui'
import React, { useCallback, useMemo } from 'react'

import type { Config } from './index.js'

import './styles.css'

type Props = Config & TextFieldClientProps

export const ColourTextComponent: React.FC<Props> = (props) => {
  const { field, path, readOnly, validate } = props

  const { admin: { className, description, style } = {}, label, required } = field

  const memoizedValidate = useCallback(
    (value: string, options: any) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, required })
      }
    },
    [validate, required],
  )

  const isReadonly = Boolean(readOnly)

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

  const classes = ['field-type', 'text', className, showError && 'error', isReadonly && 'read-only', 'container']
    .filter(Boolean)
    .join(' ')

  const colour = useMemo(() => {
    const gradient =
      'linear-gradient(45deg, var(--theme-elevation-900) 0%, var(--theme-elevation-900) 45%, var(--theme-error-500) 50%, var(--theme-elevation-900) 55%, var(--theme-elevation-900) 100%)'

    const validColour = true

    // try {
    //   // @ts-expect-error - validateColor is not typed correctly here, the function works but TS thinks it doesn't exist
    //   validColour = validateColor(value)
    // } catch {
    //   console.log('There was an error validating the colour')
    // }

    return validColour ? value : gradient
  }, [value])

  return (
    <div className={`bfColourTextFieldWrapper field-type`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} path={path} required={required} />}
      />

      {BeforeInput}

      <div className={classes}>
        <TextInputField
          className={'colourTextInput'}
          Error={<FieldError message={errorMessage} />}
          label={undefined}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
          }}
          path={path}
          readOnly={isReadonly}
          required={required}
          showError={showError}
          style={style}
          value={value}
        />

        <div
          aria-hidden={true}
          className="colourBox"
          style={{
            background: colour,
          }}
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

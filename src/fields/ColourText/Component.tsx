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
import React, { useCallback } from 'react'
import { validateHTMLColor } from 'validate-color'

import type { Config } from './index.js'

import './colourText.scss'

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

  const gradient =
    'linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 45%, rgba(255,0,0,1) 50%, rgba(255,255,255,1) 55%, rgba(255,255,255,1) 100%)'
  const colour = validateHTMLColor(value) ? value : gradient

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

        <div aria-hidden={true} className="colourBox" style={{ background: colour }} />
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

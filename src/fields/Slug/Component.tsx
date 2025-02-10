'use client'

import type { CheckboxField, TextFieldClientProps } from 'payload'

import {
  CheckboxInput,
  FieldDescription,
  FieldLabel,
  RenderCustomComponent,
  TextInput as TextInputField,
  useField,
} from '@payloadcms/ui'
import { useFormFields } from '@payloadcms/ui/forms/Form'
import React, { useCallback, useMemo } from 'react'
import slug from 'slug'

import './slug.scss'
import type { SlugOptions } from './types.js'

type Props = {
  className?: string
  config: {
    editFieldConfig: CheckboxField
    enableEditSlug: boolean
    slugOptions?: SlugOptions
    watchFields: string[]
  }
  path: string
  placeholder?: string
  readOnly?: boolean
} & TextFieldClientProps

export const SlugComponent: React.FC<Props> = (props) => {
  const { config, field, path, placeholder, readOnly, validate } = props
  const { editFieldConfig, enableEditSlug, slugOptions, watchFields } = config

  const { admin: { className, description } = {}, label, required } = field

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

  const checkboxPath = path.includes('.')
    ? path.slice(0, path.lastIndexOf('.')) + '.' + editFieldConfig.name
    : editFieldConfig.name

  const editSlugField = useField<Props>({ path: checkboxPath })

  const classes = ['field-type', 'text', className, showError && 'error', readOnly && 'read-only', 'container']
    .filter(Boolean)
    .join(' ')

  const fields = useFormFields(([fields, dispatch]) => {
    return watchFields.map((watch) => fields[watch])
  })

  // const isRequired = required
  const isReadonly = readOnly || !editSlugField.value

  const processedValue = useMemo(() => {
    const separator = slugOptions?.replacement ?? '-'

    return fields
      .filter((item) => Boolean(item?.value))
      .reduce((accumulator, currentValue, currentIndex) => {
        return String(accumulator) + (currentIndex > 0 ? separator : '') + slug(String(currentValue.value), slugOptions)
      }, '')
  }, [fields])

  React.useEffect(() => {
    if (isReadonly) {
      if (processedValue !== value) {
        setValue(processedValue)
      }
    }
  }, [isReadonly, processedValue])

  const handleCheckbox: React.FormEventHandler<HTMLInputElement> = (e) => {
    editSlugField.setValue(!editSlugField.value)
    e.stopPropagation()
  }

  return (
    <div className={`bfSlugFieldWrapper field-type`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} path={path} required={required} />}
      />

      {BeforeInput}

      <div className={classes}>
        <TextInputField
          className={'slugInput'}
          description={description}
          Error={errorMessage}
          onChange={(e: any) => {
            setValue(e.target.value)
          }}
          path={path}
          placeholder={placeholder ?? undefined}
          readOnly={isReadonly}
          required={required}
          showError={showError}
          style={{
            marginBottom: 0,
          }}
          value={value}
        />
        {enableEditSlug && (
          <div className={'checkbox'}>
            <div className={'srOnly'}>
              <FieldLabel
                htmlFor={`field-${checkboxPath.replaceAll('.', '-')}`}
                label={(editFieldConfig?.label as string) ?? ''}
              />
            </div>
            <CheckboxInput
              /* @ts-expect-error */
              checked={editSlugField.value ?? false}
              defaultChecked={editSlugField.value}
              id={`field-${checkboxPath.replaceAll('.', '-')}`}
              label={''}
              name={checkboxPath}
              onToggle={handleCheckbox}
            />
          </div>
        )}
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

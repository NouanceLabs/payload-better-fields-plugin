'use client'
import React, { useMemo, useEffect, useState, useRef } from 'react'
import { TextInput as TextInputField } from '@payloadcms/ui/fields/Text'
import { TextField as TextFieldType } from 'payload'
import type { SanitisedConfig } from '.'
import { useFormFields } from '@payloadcms/ui/forms/Form'
import { useField } from '@payloadcms/ui/forms/useField'
import { useFieldProps } from '@payloadcms/ui/forms/FieldPropsProvider'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import { useLocale } from '@payloadcms/ui/providers/Locale'

import { FieldLabel as Label } from '@payloadcms/ui/forms/FieldLabel'
import { FieldDescription } from '@payloadcms/ui/forms/FieldDescription'

type Props = TextFieldType & {
  path: string
  readOnly?: boolean
  placeholder?: string
  className?: string
  custom: {
    watchFields: string[]
    options: SanitisedConfig
  }
}

const ComboComponent: React.FC<Props> = ({ readOnly, className, required, placeholder, label, admin, ...others }) => {
  const { path, custom: customFromProps, schemaPath } = useFieldProps()
  const { watchFields, options } = customFromProps as unknown as { watchFields: string[]; options: SanitisedConfig }
  const { value, setValue, showError, errorMessage } = useField<string>({ path })
  const [processedValue, setProcessedValue] = useState(options.initial)

  let testValue = useRef(options.initial)
  const beforeInput = admin?.components?.beforeInput
  const afterInput = admin?.components?.afterInput

  const { code } = useLocale()
  const { t } = useTranslation()

  const classes = ['field-type', 'text', className, showError && 'error', readOnly && 'read-only', 'container']
    .filter(Boolean)
    .join(' ')

  const fields = useFormFields(([fields, dispatch]) => {
    return watchFields.map(watch => fields[watch])
  })

  useEffect(() => {
    console.log({ fields })
  }, [fields])

  const isRequired = required
  const isReadonly = readOnly || admin?.readOnly
  const hasCallback = true
  const separator = options?.separator ?? ' '

  useEffect(() => {
    async function getFields() {
      const reducedFields = await fields
        .filter(item => Boolean(item.value))
        .reduce(async (accumulator, currentValue, currentIndex) => {
          console.log({ value: currentValue.value, accumulator })
          const accumulatorValue = await accumulator
          const value = String(currentValue.value)

          return String(accumulatorValue) + (currentIndex > 0 ? separator : '') + value
        }, Promise.resolve(options.initial))

      return reducedFields
    }

    getFields().then(data => {
      console.log('data', data)
      //setProcessedValue(data)

      testValue.current = data
    })
  }, [fields, customFromProps])

  /* const processedValue = useMemo(() => {
    const separator = options?.separator ?? ' '

    async function getFields() {
      const reducedFields = await fields
        .filter(item => Boolean(item.value))
        .reduce(async (accumulator, currentValue, currentIndex) => {
          console.log({ value: currentValue.value })
          const value = hasCallback ? await getCallbackValue(String(currentValue.value)) : String(currentValue.value)

          return String(accumulator) + (currentIndex > 0 ? separator : '') + value
        }, Promise.resolve(options.initial))

      return reducedFields
    }

    return getFields()
  }, [fields, customFromProps]) */

  const labelToUse = label
    ? typeof label === 'function'
      ? // @ts-expect-error
        label({ t })
      : typeof label === 'string'
        ? label
        : label[code]
    : ''

  useEffect(() => {
    if (testValue.current !== value) {
      setValue(testValue.current)
    }
  }, [testValue.current])

  return (
    <div className={`bfComboFieldWrapper field-type`}>
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={labelToUse} required={isRequired} />
      <div className={classes}>
        {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
        <TextInputField
          path={path}
          name={others.name}
          label={undefined}
          required={isRequired}
          readOnly={isReadonly}
          onChange={e => {
            setValue(e.target.value)
          }}
          className={'comboInput'}
          value={value}
          showError={showError}
          errorProps={{ message: errorMessage }}
          style={{
            marginBottom: 0,
          }}
        />
        {Array.isArray(afterInput) && afterInput.map((Component, i) => <Component key={i} />)}
      </div>
      <FieldDescription
        className={`field-description-${path.replace(/\./g, '__')}`}
        description={typeof admin?.description === 'string' ? admin?.description : ''}
      />
    </div>
  )
}

export default ComboComponent

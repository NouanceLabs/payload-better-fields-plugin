'use client'
import type { TextFieldClientProps, TextField as TextFieldType } from 'payload'

import { FieldDescription, FieldLabel, useField } from '@payloadcms/ui'
import { TextInput as TextInputField } from '@payloadcms/ui/fields/Text'
import { useLocale } from '@payloadcms/ui/providers/Locale'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import React, { useMemo } from 'react'
import validateColor from 'validate-color'

import './colourText.scss'

type Props = {} & TextFieldClientProps

export const ColourTextComponent: React.FC<Props> = (props) => {
  const {  className,  label, path,field: {admin, required} } = props
  const { errorMessage, setValue, showError, value } = useField<string>({ path })

  const classes = ['field-type', 'text', className, showError && 'error', admin?.readOnly && 'read-only', 'container']
    .filter(Boolean)
    .join(' ')

  const isRequired = required
  const isReadonly = admin?.readOnly
  const style = admin?.style
  const width = admin?.width
  const beforeInput = admin?.components?.beforeInput
  const afterInput = admin?.components?.afterInput

  const { code } = useLocale()
  const { t } = useTranslation()

  // @ts-expect-error
  const labelToUse = label
    ? typeof label === 'function'
      ? label({ t })
      : typeof label === 'string'
        ? label
        : label[code]
    : ''

  const gradient =
    'linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 45%, rgba(255,0,0,1) 50%, rgba(255,255,255,1) 55%, rgba(255,255,255,1) 100%)'
  const colour = validateColor(value) ? value : gradient

  return (
    <div className={`bfColourTextFieldWrapper field-type`}>
      <Label htmlFor={`field-${path.replace(/\./g, '__')}`} label={labelToUse} required={isRequired} />
      <div className={classes}>
        {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
        <TextInputField
          className={'colourTextInput'}
          errorProps={{
            message: errorMessage,
          }}
          label={undefined}
          name={others.name}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          path={path}
          readOnly={isReadonly}
          required={isRequired}
          showError={showError}
          style={style}
          value={value}
          width={width}
        />
        <div aria-hidden={true} className="colourBox" style={{ background: colour }} />
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

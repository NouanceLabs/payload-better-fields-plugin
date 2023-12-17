import React, { useMemo } from 'react'
import { Label, useField, useFormFields } from 'payload/components/forms'
import TextInputField from 'payload/dist/admin/components/forms/field-types/Text/Input'
import { Props as TextFieldType } from 'payload/dist/admin/components/forms/field-types/Text/types'
import validateColor from 'validate-color'
import FieldDescription from 'payload/dist/admin/components/forms/FieldDescription'

import '../../styles/colourText.scss'

type Props = TextFieldType & {
  path: string
  placeholder?: string
  className?: string
}

const ComboComponent: React.FC<Props> = ({
  className,
  required,
  path,
  placeholder,
  label,
  admin,
  custom,
  ...others
}) => {
  const { value, setValue, showError, errorMessage } = useField<Props>({ path })

  const classes = [
    'field-type',
    'text',
    className,
    showError && 'error',
    admin?.readOnly && 'read-only',
    'container',
  ]
    .filter(Boolean)
    .join(' ')

  const isRequired = required
  const isReadonly = admin?.readOnly
  const style = admin?.style
  const width = admin?.width
  const beforeInput = admin?.components?.beforeInput
  const afterInput = admin?.components?.afterInput

  const gradient =
    'linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 45%, rgba(255,0,0,1) 50%, rgba(255,255,255,1) 55%, rgba(255,255,255,1) 100%)'
  // @ts-expect-error
  const colour = validateColor(value) ? value : gradient

  return (
    <div className={`bfColourTextFieldWrapper field-type`}>
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={label} required={isRequired} />
      <div className={classes}>
        {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
        <TextInputField
          path={path}
          name={others.name}
          label={false}
          required={isRequired}
          readOnly={isReadonly}
          onChange={e => {
            setValue(e.target.value)
          }}
          className={'colourTextInput'}
          /* @ts-expect-error */
          value={value}
          showError={showError}
          errorMessage={errorMessage}
          width={width}
          /* style={{
            marginBottom: 0,
            ...style,
          }} */
          style={style}
        />

        {/* @ts-expect-error */}
        <div aria-hidden={true} className="colourBox" style={{ background: colour }} />
        {Array.isArray(afterInput) && afterInput.map((Component, i) => <Component key={i} />)}
      </div>
      <FieldDescription
        className={`field-description-${path.replace(/\./g, '__')}`}
        description={admin?.description}
        value={value}
      />
    </div>
  )
}

export default ComboComponent

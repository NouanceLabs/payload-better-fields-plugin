import React, { useMemo } from 'react'
import { Label, useField, useFormFields } from 'payload/components/forms'
import slugify from 'slugify'
import TextInputField from 'payload/dist/admin/components/forms/field-types/Text/Input'
import { CheckboxInput } from 'payload/dist/admin/components/forms/field-types/Checkbox/Input'
import { Checkbox } from 'payload/components/forms'
import { Props as TextFieldType } from 'payload/dist/admin/components/forms/field-types/Text/types'
import type { SlugifyOptions } from '../../types'
import type { Field } from 'payload/types'
/* @ts-expect-error */
import styles from './styles.module.css'

type Props = TextFieldType & {
  path: string
  readOnly?: boolean
  placeholder?: string
  className?: string
  custom: {
    watchFields: string[]
    slugifyOptions?: SlugifyOptions
    editFieldConfig: Field
    enableEditSlug: boolean
  }
}

const SlugComponent: React.FC<Props> = ({
  readOnly,
  className,
  required,
  path,
  placeholder,
  label,
  admin,
  custom,
  ...others
}) => {
  const { watchFields, slugifyOptions, editFieldConfig, enableEditSlug } = custom
  const [storedValue, setStoredValue] = React.useState('')
  const { value, setValue, showError } = useField<Props>({ path })

  const checkboxPath = path.includes('.')
    ? /* @ts-expect-error */
      path.slice(0, path.lastIndexOf('.')) + '.' + editFieldConfig.name
    : /* @ts-expect-error */
      editFieldConfig.name

  console.log('checkboxPath', checkboxPath)

  const editSlugField = useField<Props>({ path: checkboxPath })

  console.log('editSlugField', checkboxPath, editSlugField.value)

  /* React.useEffect(() => {
    setStoredValue(value)
  }, [value]) */

  const classes = [
    'field-type',
    'text',
    className,
    showError && 'error',
    readOnly && 'read-only',
    styles.container,
  ]
    .filter(Boolean)
    .join(' ')

  const fields = useFormFields(([fields, dispatch]) => {
    return watchFields.map(watch => fields[watch])
  })

  const isRequired = required
  const isReadonly = readOnly || !Boolean(editSlugField.value)

  console.log('fields', fields)

  const processedValue = useMemo(() => {
    const separator = slugifyOptions?.replacement ?? '-'

    return fields
      .filter(item => Boolean(item.value))
      .reduce((accumulator, currentValue, currentIndex) => {
        return (
          String(accumulator) +
          (currentIndex > 0 ? separator : '') +
          slugify(String(currentValue.value), slugifyOptions)
        )
      }, '')
  }, [fields, custom, slugify])

  React.useEffect(() => {
    if (isReadonly) {
      setValue(processedValue)
    }
  }, [isReadonly, processedValue])

  const handleCheckbox: React.FormEventHandler<HTMLInputElement> = () => {
    editSlugField.setValue(!Boolean(editSlugField.value))
  }

  console.log('isReadonly', isReadonly)
  console.log('processedValue', processedValue)
  console.log('storedValue', value)

  return (
    <div className={styles.wrapper}>
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={label} />
      <div className={classes}>
        <TextInputField
          path={path}
          name={others.name}
          label={false}
          required={isRequired}
          readOnly={isReadonly}
          onChange={e => {
            setValue(e.target.value)
          }}
          className={styles.slugInput}
          /* @ts-expect-error */
          value={value}
          showError={showError}
          style={{
            marginBottom: 0,
          }}
        />
        <div className={styles.checkbox}>
          <div className={styles.srOnly}>
            <Label htmlFor={`field-${checkboxPath.replaceAll('.', '-')}`} label="hey" />
          </div>
          <CheckboxInput
            id={`field-${checkboxPath.replaceAll('.', '-')}`}
            onToggle={handleCheckbox}
            /* @ts-expect-error */
            checked={editSlugField.value ?? false}
            label={''}
            name={checkboxPath}
          />
        </div>
      </div>
    </div>
  )
}

export default SlugComponent

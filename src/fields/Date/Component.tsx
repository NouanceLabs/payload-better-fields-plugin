'use client'
import React, { MouseEventHandler, useCallback, useMemo } from 'react'
import { useField } from '@payloadcms/ui/forms/useField'
import { useFieldProps } from '@payloadcms/ui/forms/FieldPropsProvider'
import { FieldLabel as Label } from '@payloadcms/ui/forms/FieldLabel'
import { FieldError as Error } from '@payloadcms/ui/forms/FieldError'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import { useLocale } from '@payloadcms/ui/providers/Locale'
import type { DateField, Option, OptionObject, SelectField } from 'payload/types'
import type { Timezone } from '.'
import { DatePickerField as DatePicker } from '@payloadcms/ui/elements/DatePicker'
import { ReactSelect } from '@payloadcms/ui/elements/ReactSelect'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { FieldDescription } from '@payloadcms/ui/forms/FieldDescription'
import '../../styles/date.scss'

type Props = DateField & {
  path: string
  readOnly?: boolean
  placeholder?: string
  className?: string
  custom: {
    timezone?: Timezone
    timezoneField: SelectField
  }
}

const DateComponent: React.FC<Props> = ({ readOnly, className, required, label, admin, type, ...others }) => {
  const { path, custom: customFromProps } = useFieldProps()
  const { timezone, timezoneField: timezoneFieldProps } = customFromProps as unknown as any
  const { value, setValue, showError, errorMessage } = useField<Props>({ path })
  const placeholder = admin?.placeholder ?? ''
  const { code } = useLocale()
  const { t } = useTranslation()

  const beforeInput = admin?.components?.beforeInput
  const afterInput = admin?.components?.afterInput

  // @todo: figure it out later
  //const saveWithTimezone = timezone?.saveWithTimezone
  const datePickerProps = admin?.date

  const timezonePath = path.includes('.')
    ? path.slice(0, path.lastIndexOf('.')) + '.' + timezoneFieldProps.name
    : timezoneFieldProps.name

  const timezoneField = useField<Props>({ path: timezonePath })

  const timezoneValue = timezoneField.value

  // @ts-expect-error
  const labelToUse = label
    ? typeof label === 'function'
      ? label({ t })
      : typeof label === 'string'
        ? label
        : label[code]
    : ''

  const renderedValue = useMemo(() => {
    // @ts-expect-error
    const modifiedValue = utcToZonedTime(value, timezoneValue)

    return modifiedValue
  }, [value, timezoneValue])

  const visibleTimezone = useMemo(() => {
    const options = timezoneFieldProps.options as OptionObject[]

    const item = options.find(value => {
      // @ts-expect-error
      return value.value === timezoneValue
    })

    return item
  }, [timezoneValue, timezoneFieldProps.options])

  let dateFormat = datePickerProps?.displayFormat

  if (!datePickerProps?.displayFormat) {
    // when no displayFormat is provided, determine format based on the picker appearance
    if (datePickerProps?.pickerAppearance === 'default') dateFormat = 'MM/dd/yyyy'
    else if (datePickerProps?.pickerAppearance === 'dayAndTime') dateFormat = 'MMM d, yyy h:mm a'
    else if (datePickerProps?.pickerAppearance === 'timeOnly') dateFormat = 'h:mm a'
    else if (datePickerProps?.pickerAppearance === 'dayOnly') dateFormat = 'MMM dd'
    else if (datePickerProps?.pickerAppearance === 'monthOnly') dateFormat = 'MMMM'
  }

  const onChange = useCallback(
    (incomingDate: Date) => {
      if (!readOnly) {
        // @ts-expect-error
        const zonedTime = zonedTimeToUtc(incomingDate, timezoneValue)

        setValue(zonedTime?.toISOString() || null)
      }
    },
    [timezoneValue],
  )

  const classes = ['', 'text', className, showError && 'error', readOnly && 'read-only', 'container']
    .filter(Boolean)
    .join(' ')

  const isRequired = required
  const isReadonly = readOnly || admin?.readOnly

  return (
    <div className={`bfDateFieldWrapper field-type`}>
      <Error showError={showError} message={errorMessage ?? ''} />
      <div>
        <div className={classes}>
          {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
          <div className='fieldsWrapper'>
            <div className='dateField'>
              <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={labelToUse} required={isRequired} />

              <DatePicker
                {...datePickerProps}
                onChange={onChange}
                readOnly={isReadonly}
                value={renderedValue}
                overrides={{ id: `field-${path.replace(/\./g, '__')}`, locale: undefined }}
              />
            </div>
            <div className='timezoneField'>
              <div>
                <Label htmlFor={`field-${timezonePath.replaceAll('.', '-')}`} label={timezoneFieldProps?.label ?? ''} />
              </div>
              <ReactSelect
                inputId={`field-${timezonePath.replaceAll('.', '-')}`}
                value={visibleTimezone}
                isMulti={false}
                onChange={selected => {
                  console.log('select', selected.value)
                  timezoneField.setValue(selected.value)
                }}
                disabled={isReadonly}
                options={timezoneFieldProps.options}
              />
            </div>
          </div>
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

export default DateComponent

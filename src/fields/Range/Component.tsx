'use client'
import React, { MouseEventHandler, useCallback } from 'react'
import { useField } from '@payloadcms/ui/forms/useField'
import { FieldLabel as Label } from '@payloadcms/ui/forms/FieldLabel'
import { FieldError as Error } from '@payloadcms/ui/forms/FieldError'
import type { NumberField } from 'payload/types'
import type { Config } from '.'
import { FieldDescription } from '@payloadcms/ui/forms/FieldDescription'
import '../../styles/range.scss'

type Props = NumberField & {
  path: string
  readOnly?: boolean
  placeholder?: string
  className?: string
  custom: {
    config?: Config
  }
}

const RangeComponent: React.FC<Props> = ({
  readOnly,
  className,
  required,
  path,
  label,
  admin,
  custom,
  type,
  min,
  max,
  ...others
}) => {
  const { config } = custom
  const { value, setValue, showError, errorMessage } = useField<Props>({ path })
  const placeholder = admin?.placeholder

  const beforeInput = admin?.components?.beforeInput
  const afterInput = admin?.components?.afterInput

  const step = config?.step ?? 1
  const usedMin = min ?? 1
  const usedMax = max ?? 100
  const rangeValue = usedMax - usedMin
  const showPreview = config?.showPreview
  const markers = config?.markers

  const classes = [
    '',
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

  const getPosition = useCallback(
    (value: number) => {
      const remainder = value - usedMin

      if (remainder === 0) return 0

      return (remainder / rangeValue) * 100
    },
    [rangeValue, usedMin, usedMax],
  )

  const handleReset: MouseEventHandler = e => {
    e.preventDefault()
    setValue(null)
  }

  return (
    <div className={`bfRangeFieldWrapper field-type`}>
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={label} required={isRequired} />
      <Error showError={showError} message={errorMessage ?? ''} />
      <div className="containerWrapper">
        {showPreview && (
          <>
            {/* @ts-expect-error */}
            <div className="valuePreview">{Boolean(value) ? value : '/'}</div>
          </>
        )}
        <div className={classes}>
          {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
          <input
            type="range"
            onChange={e => {
              setValue(e.target.value)
            }}
            // @ts-expect-error
            value={value}
            id={`field-${path.replace(/\./gi, '__')}`}
            name={path}
            required={isRequired}
            readOnly={isReadonly}
            className="rangeInput"
            min={usedMin}
            max={usedMax}
            step={step}
            placeholder={typeof placeholder === 'string' ? placeholder : ''}
            {...(markers?.length && markers.length > 0
              ? { list: `field-markers-${path.replace(/\./gi, '__')}` }
              : {})}
          />
          {markers?.length && markers.length > 0 && (
            <datalist className="markersList" id={`field-markers-${path.replace(/\./gi, '__')}`}>
              {markers.map((marker, index) => {
                return (
                  <option
                    data-test={getPosition(marker.value)}
                    style={{
                      left: `${getPosition(marker.value)}%`,
                    }}
                    value={marker.value}
                    key={index}
                  >
                    {marker.label}
                  </option>
                )
              })}
            </datalist>
          )}
          {Array.isArray(afterInput) && afterInput.map((Component, i) => <Component key={i} />)}
        </div>
      </div>
      {!isRequired && Boolean(value) && (
        <button
          className="btn btn--size-small btn--style-secondary resetButton"
          onClick={handleReset}
        >
          Reset
        </button>
      )}
      <FieldDescription
        className={`field-description-${path.replace(/\./g, '__')}`}
        description={typeof admin?.description === 'string' ? admin?.description : ''}
        /* value={value} */
      />
    </div>
  )
}

export default RangeComponent

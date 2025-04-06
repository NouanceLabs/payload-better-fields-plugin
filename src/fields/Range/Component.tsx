'use client'
import type { NumberFieldClientProps } from 'payload'

import {
  FieldError as Error,
  FieldDescription,
  FieldLabel,
  FieldLabel as Label,
  RenderCustomComponent,
  useField,
} from '@payloadcms/ui'
import { type MouseEventHandler, useCallback } from 'react'

import type { Config } from './index.js'

import './range.scss'

type Props = {
  className?: string
  config?: Config
  path: string
  placeholder?: string
  readOnly?: boolean
} & NumberFieldClientProps

export const RangeComponent: React.FC<Props> = (props) => {
  const { config, field, path, readOnly, validate } = props
  const { admin: { className, description, placeholder, readOnly: adminReadOnly } = {}, label, required } = field

  const memoizedValidate = useCallback(
    (value: number & number[], options: any) => {
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

  const step = config?.step ?? 1
  const usedMin = field.min ?? 1
  const usedMax = field.max ?? 100
  const rangeValue = usedMax - usedMin
  const markers = config?.markers ?? []

  const getPosition = useCallback(
    (value: number) => {
      const remainder = value - usedMin
      if (remainder === 0) {
        return 0
      }
      return (remainder / rangeValue) * 100
    },
    [rangeValue, usedMin],
  )

  const classes = ['', 'text', className, showError && 'error', readOnly && 'read-only', 'container']
    .filter(Boolean)
    .join(' ')

  const isReadonly = Boolean(readOnly) || Boolean(adminReadOnly)

  const handleReset: MouseEventHandler = (e) => {
    e.preventDefault()
    setValue(null)
  }

  return (
    <div className={`bfRangeFieldWrapper field-type`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} path={path} required={required} />}
      />

      <div className="containerWrapper">
        {config?.showPreview && (
          <>
            <div className="valuePreview">{value ? value : '/'}</div>
          </>
        )}
        <div className={classes}>
          {BeforeInput}

          <input
            className="rangeInput"
            id={`field-${path.replace(/\./g, '__')}`}
            max={usedMax}
            min={usedMin}
            name={path}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            placeholder={typeof placeholder === 'string' ? placeholder : ''}
            readOnly={isReadonly}
            required={required}
            step={step}
            type="range"
            value={value || 0}
            {...(markers?.length && markers.length > 0 ? { list: `field-markers-${path.replace(/\./g, '__')}` } : {})}
          />

          <datalist className="markersList" id={`field-markers-${path.replace(/\./g, '__')}`}>
            {markers.map((marker, index) => {
              return (
                <option
                  data-test={getPosition(marker.value)}
                  key={index}
                  style={{
                    left: `${getPosition(marker.value)}%`,
                  }}
                  value={marker.value}
                >
                  {marker.label}
                </option>
              )
            })}
          </datalist>
        </div>

        <Error message={errorMessage ?? ''} showError={showError} />
      </div>

      {!required && Boolean(value) && (
        <button className="btn btn--size-small btn--style-secondary resetButton" onClick={handleReset} type="button">
          Reset
        </button>
      )}

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

import React, { MouseEventHandler, useCallback } from 'react'
import { Label, useField } from 'payload/components/forms'
import Error from 'payload/dist/admin/components/forms/Error'
import { NumberField } from 'payload/types'
import { Config } from '.'
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

  console.log('others', others)
  console.log('range', config)

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
    <div className={`bfRangeFieldWrapper`}>
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
    </div>
  )
}

export default RangeComponent

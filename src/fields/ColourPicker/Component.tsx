'use client'
import type { TextFieldClientProps } from 'payload'

import { RenderCustomComponent, useField } from '@payloadcms/ui'
import { FieldDescription } from '@payloadcms/ui/fields/FieldDescription'
import { FieldLabel } from '@payloadcms/ui/fields/FieldLabel'
import { useDebouncedCallback } from '@payloadcms/ui/hooks/useDebouncedCallback'
import { extend } from 'colord'
import namesPlugin from 'colord/plugins/names'
import React, { useCallback, useMemo, useState } from 'react'
import {
  HexAlphaColorPicker,
  HexColorPicker,
  HslaStringColorPicker,
  HslStringColorPicker,
  RgbaStringColorPicker,
  RgbStringColorPicker,
} from 'react-colorful'

import type { Config } from './index.js'

import './styles.css'

// @ts-expect-error - unknown lib issue
extend([namesPlugin])

const ColourComponents: Record<Config['type'], any> = {
  hex: HexColorPicker,
  hexA: HexAlphaColorPicker,
  hsl: HslStringColorPicker,
  hslA: HslaStringColorPicker,
  rgb: RgbStringColorPicker,
  rgbA: RgbaStringColorPicker,
}

type Props = Config & TextFieldClientProps

export const ColourPickerComponent: React.FC<Props> = (props) => {
  const {
    type,
    expanded = false,
    field: { admin: { description } = {}, label, required },
    inputRef,
    path,
    readOnly,
    showPreview,
    validate,
  } = props

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
    setValue,
    value,
  } = useField<string>({
    path,
    // @ts-expect-error - memoizedValidate is not typed
    validate: memoizedValidate,
  })

  const [isAdding, setIsAdding] = useState(expanded)

  const Picker = useMemo(() => {
    return type ? ColourComponents[type] : ColourComponents['hex']
  }, [type])

  // Had to debounce it here so it doesn't error with maxdepth
  const debouncedAddColor = useDebouncedCallback((val?: string) => {
    if (val !== value && !isReadonly) {
      setValue(val)
      if (inputRef?.current) {
        inputRef.current.value = val ?? ''
      }
    }
  }, 150)

  const handleAddColor = useCallback(
    (val?: string) => {
      if (val !== value && !isReadonly) {
        setValue(val)
      }
    },
    [value, isReadonly, setValue],
  )

  const labelToUse = label

  return (
    <div className={`bfColourPickerFieldWrapper`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={labelToUse} path={path} required={required} />}
      />

      {BeforeInput}

      {(expanded || isAdding) && (
        <div className="expandedContainer">
          <div
            className={['colourPickerWrapper', isReadonly && 'readOnly'].filter(Boolean).join(' ')}
            // @ts-expect-error - inert is not a valid attribute
            inert={isReadonly ? '' : null}
          >
            <Picker
              color={value || ''}
              onBlur={(e: FocusEvent) => {
                if (e.relatedTarget === null) {
                  setIsAdding(false)
                }
              }}
              onChange={debouncedAddColor}
              onKeyDown={(e: KeyboardEvent) => (e.key === 'Enter' || e.key === 'Escape') && setIsAdding(false)}
            />
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <input
            className={`manual-field-input`}
            id={`field-${path}`}
            onChange={({ currentTarget }) => {
              handleAddColor(currentTarget.value)
            }}
            readOnly={isReadonly}
            ref={inputRef}
            value={value || ''}
          />
        </div>
      )}
      {!expanded && (
        <div className="buttonContainer">
          <button
            aria-label={value}
            className={`chip chip--clickable`}
            onClick={() => {
              setIsAdding(!isAdding)
            }}
            style={{ backgroundColor: value }}
            type="button"
          />
          {showPreview && (
            <>
              <label className="srOnly" htmlFor={`bfColourPickerField-previewField-${path.replace(/\./g, '__')}`}>
                Preview
              </label>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <input
                className="previewField"
                disabled
                id={`bfColourPickerField-previewField-${path.replace(/\./g, '__')}`}
                value={value}
              />
            </>
          )}
        </div>
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

import React, { useState, useCallback, useMemo, useRef } from 'react'
import { extend } from 'colord'
import namesPlugin from 'colord/plugins/names'
import { useField } from 'payload/components/forms'
import { Label } from 'payload/components/forms'
import FieldDescription from 'payload/dist/admin/components/forms/FieldDescription'
import { Props as TextFieldType } from 'payload/dist/admin/components/forms/field-types/Text/types'
import {
  HexColorPicker,
  HexAlphaColorPicker,
  HslaStringColorPicker,
  HslStringColorPicker,
  RgbaStringColorPicker,
  RgbStringColorPicker,
} from 'react-colorful'
import { Config } from '.'
import '../../styles/colourPicker.scss'

extend([namesPlugin])
const defaultColor = '#9A9A9A'

type Props = TextFieldType & {
  path: string
  placeholder?: string
  className?: string
  custom: Config
}

const ColourComponents: Record<Config['type'], any> = {
  hex: HexColorPicker,
  hexA: HexAlphaColorPicker,
  hsl: HslStringColorPicker,
  hslA: HslaStringColorPicker,
  rgb: RgbStringColorPicker,
  rgbA: RgbaStringColorPicker,
}

const ColourPickerComponent: React.FC<Props> = props => {
  const { path, label, required, defaultValue, custom, admin } = props
  const beforeInput = admin?.components?.beforeInput
  const afterInput = admin?.components?.afterInput
  const isReadonly = Boolean(admin?.readOnly)

  const inputRef = useRef<HTMLInputElement>(null)

  const { value = '', setValue } = useField({
    path,
  })

  const isExpanded = Boolean(custom.expanded)

  const [color, setColor] = useState(value ?? defaultValue ?? defaultColor)
  const [isAdding, setIsAdding] = useState(isExpanded)

  const Picker = useMemo(() => {
    return ColourComponents[custom.type]
  }, [])

  const handleAddColorViaPicker = useCallback(
    (val?: string) => {
      if (val !== value && !isReadonly) {
        setValue(val)
        if (inputRef.current) {
          inputRef.current.value = val ?? ''
        }
      }
    },
    [setIsAdding, setValue, inputRef, isReadonly],
  )

  const handleAddColor = useCallback(
    (val?: string) => {
      if (val !== value && !isReadonly) {
        setValue(val)
      }
    },
    [setIsAdding, setValue, isReadonly],
  )

  return (
    <div className={`bfColourPickerFieldWrapper`}>
      {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
      <Label
        htmlFor={`bfColourPickerField-${path.replace(/\./gi, '__')}`}
        label={label}
        required={required}
      />
      {(isExpanded || isAdding) && (
        <div>
          <div
            className={['colourPickerWrapper', isReadonly && 'readOnly'].filter(Boolean).join(' ')}
            // @ts-expect-error
            inert={isReadonly ? '' : null}
          >
            <Picker
              onChange={handleAddColorViaPicker}
              color={value}
              onBlur={(e: FocusEvent) => {
                if (e.relatedTarget === null) {
                  setIsAdding(false)
                }
              }}
              onKeyDown={(e: KeyboardEvent) =>
                (e.key === 'Enter' || e.key === 'Escape') && setIsAdding(false)
              }
            />
          </div>

          <input
            id={`bfColourPickerField-${path.replace(/\./gi, '__')}`}
            ref={inputRef}
            onChange={({ currentTarget }) => {
              handleAddColor(currentTarget.value)
            }}
            // @ts-expect-error
            defaultValue={value}
            readOnly={isReadonly}
            className={`manual-field-input`}
          />
        </div>
      )}
      {!isExpanded && (
        <div className="buttonContainer">
          <button
            type="button"
            className={`chip chip--clickable`}
            // @ts-expect-error
            style={{ backgroundColor: value }}
            aria-label={color}
            onClick={() => {
              setIsAdding(!isAdding)
            }}
          />
          {custom.showPreview && (
            <>
              <label
                htmlFor={`bfColourPickerField-previewField-${path.replace(/\./gi, '__')}`}
                className="srOnly"
              >
                Preview
              </label>
              <input
                id={`bfColourPickerField-previewField-${path.replace(/\./gi, '__')}`}
                className="previewField"
                disabled
                /* @ts-expect-error */
                value={value}
              />
            </>
          )}
        </div>
      )}
      <FieldDescription
        className={`field-description-${path.replace(/\./g, '__')}`}
        description={admin?.description}
        value={value}
      />
      {Array.isArray(afterInput) && afterInput.map((Component, i) => <Component key={i} />)}
    </div>
  )
}
export default ColourPickerComponent

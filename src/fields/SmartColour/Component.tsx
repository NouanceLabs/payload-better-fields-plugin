import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { colord, extend } from 'colord'
import namesPlugin from 'colord/plugins/names'
import { useField } from 'payload/components/forms'
import { usePreferences } from 'payload/components/preferences'
import { Label } from 'payload/components/forms'
import { Props as TextFieldType } from 'payload/dist/admin/components/forms/field-types/Text/types'
import {
  HexColorPicker,
  HexAlphaColorPicker,
  HslaStringColorPicker,
  HslStringColorPicker,
  RgbaStringColorPicker,
  RgbStringColorPicker,
} from 'react-colorful'
import { Modal, useModal } from '@faceless-ui/modal'
import { Config } from './'
import './styles.scss'

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

const SmartColourComponent: React.FC<Props> = props => {
  const { path, label, required, defaultValue, custom } = props
  const { getPreference, setPreference } = usePreferences()
  const inputRef = useRef<HTMLInputElement>(null)

  const { value = '', setValue } = useField({
    path,
  })

  const isExpanded = custom.mode === 'expanded'

  const [color, setColor] = useState(value ?? defaultValue ?? defaultColor)
  const [isAdding, setIsAdding] = useState(isExpanded)

  const Picker = useMemo(() => {
    return ColourComponents[custom.type]
  }, [])

  const handleAddColorViaPicker = useCallback(
    (val?: string) => {
      if (val !== value) {
        setValue(val)
        if (inputRef.current) {
          inputRef.current.value = val ?? ''
        }
      }
      /* if (!isExpanded) setIsAdding(false) */
    },
    [setIsAdding, setValue, inputRef],
  )

  const handleAddColor = useCallback(
    (val?: string) => {
      if (val !== value) {
        setValue(val)
      }
      /* if (!isExpanded) setIsAdding(false) */
    },
    [setIsAdding, setValue],
  )

  return (
    <div className={`bfSmartColourFieldWrapper`}>
      <Label
        htmlFor={`bfSmartColourField-${path.replace(/\./gi, '__')}`}
        label={label}
        required={required}
      />
      {(isExpanded || isAdding) && (
        <div /* className={[!isExpanded && 'floatingPicker'].filter(Boolean).join(' ')} */>
          <Picker
            onChange={handleAddColorViaPicker}
            color={value}
            onBlur={() => {
              setIsAdding(false)
            }}
          />

          <input
            id={`bfSmartColourField-${path.replace(/\./gi, '__')}`}
            ref={inputRef}
            onChange={({ currentTarget }) => {
              handleAddColor(currentTarget.value)
            }}
            /* onBlur={e => {
              setIsAdding(false)
            }} */
            // @ts-expect-error
            defaultValue={value}
            className={`manual-field-input`}
            /* onChange={setColorToAdd} */
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
              /* setValue(color) */
              setIsAdding(!isAdding)
            }}
          />
          {custom.showPreview && (
            <>
              <label
                htmlFor={`bfSmartColourField-previewField-${path.replace(/\./gi, '__')}`}
                className="srOnly"
              >
                Preview
              </label>
              <input
                id={`bfSmartColourField-previewField-${path.replace(/\./gi, '__')}`}
                className="previewField"
                disabled
                /* defaultValue={value} */
                /* @ts-expect-error */
                value={value}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}
export default SmartColourComponent

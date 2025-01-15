import React from 'react'
import { TextField as TextFieldType } from 'payload/types'
import type { SanitisedConfig } from '.'
import { runCallback } from './actions/runCallback'
type Props = TextFieldType & {
  path: string
  readOnly?: boolean
  placeholder?: string
  className?: string
  custom: {
    watchFields: string[]
    options: SanitisedConfig
  }
}

const ComboComponent: React.FC<Props> = ({
  readOnly,
  className,
  required,
  placeholder,
  label,
  admin,
  custom,
  ...others
}) => {
  const runCallbackAction = runCallback({ callback: custom.options.callback })
  console.log({ custom })
  
  return <div className={`bfComboFieldWrapper field-type`}>server component</div>
}

export default ComboComponent

import type { UIFieldServerProps } from 'payload'

import React, { type ReactElement } from 'react'

import type { BaseConfig, Config } from './index.js'

import { AlertIcon } from './icons/AlertIcon.js'
import { ErrorIcon } from './icons/ErrorIcon.js'
import { InfoIcon } from './icons/InfoIcon.js'
import './styles.css'

type Props = {
  field: {
    admin: {
      custom: Config
    } & UIFieldServerProps['field']['admin']
  } & UIFieldServerProps['field']
} & UIFieldServerProps

export const AlertBoxComponent: React.FC<Props> = (props) => {
  const { field } = props

  const { type, className, icon, message } = field.admin.custom

  const iconMap: Record<BaseConfig['type'], ReactElement> = {
    alert: <AlertIcon />,
    error: <ErrorIcon />,
    info: <InfoIcon />,
  }

  return (
    <div className={`bfAlertBoxFieldWrapper ${String(type) + 'AlertType'} ${className ?? ''} `} role="status">
      {icon?.enable && <div className="iconContainer">{iconMap[type]}</div>}
      <div className="contentContainer">{message ?? ''}</div>
    </div>
  )
}

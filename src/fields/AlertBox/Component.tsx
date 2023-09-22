import React, { ReactElement, useMemo } from 'react'
import { useField, useFormFields } from 'payload/components/forms'
import type { UIField } from 'payload/types'
import type { Config, BaseConfig } from '.'
import InfoIcon from './icons/InfoIcon'
import ErrorIcon from './icons/ErrorIcon'
import AlertIcon from './icons/AlertIcon'

import './style.scss'

type Props = UIField & {
  placeholder?: string
  className?: string
  custom: Config
}

const AlertBoxComponent: React.FC<Props> = ({ placeholder, label, admin, custom, ...others }) => {
  const width = admin?.width
  const { type, message, Content, className, icon } = custom
  console.log('custom', custom)

  const iconMap: Record<BaseConfig['type'], ReactElement> = {
    info: <InfoIcon />,
    alert: <AlertIcon />,
    error: <ErrorIcon />,
  }

  return (
    <div
      role="status"
      className={`bfAlertBoxFieldWrapper ${type === 'custom' ? className : type + 'AlertType'}`}
      style={{
        width,
      }}
    >
      {icon?.enable && type !== 'custom' && (
        <div className="iconContainer">{icon.Element ? <icon.Element /> : iconMap[type]}</div>
      )}
      <div className="contentContainer">{type === 'custom' ? <Content /> : message}</div>
    </div>
  )
}

export default AlertBoxComponent

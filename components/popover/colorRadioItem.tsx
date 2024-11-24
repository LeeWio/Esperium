'use client'

import type { RadioProps } from '@nextui-org/react'

import React from 'react'
import { Tooltip, VisuallyHidden, useRadio } from '@nextui-org/react'
import { cn } from '@nextui-org/react'

export type ColorRadioItemProps = Omit<RadioProps, 'color'> & {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  tooltip?: string
}

const colorClassMap = {
  default: 'bg-default',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

const ColorRadioItem = React.forwardRef<HTMLInputElement, ColorRadioItemProps>(
  ({ color = 'default', tooltip = '', ...props }, ref) => {
    const { Component, isSelected, getBaseProps, getInputProps } = useRadio(props)

    return (
      <Tooltip content={tooltip} delay={1000} isDisabled={!tooltip} offset={0} placement="top">
        <Component {...getBaseProps()} ref={ref}>
          <VisuallyHidden>
            <input {...getInputProps()} />
          </VisuallyHidden>
          <span
            className={cn(
              'pointer-events-none h-8 w-8 rounded-full border border-black border-opacity-10 transition-transform group-data-[pressed=true]:scale-90',
              colorClassMap[color],
              {
                'ring-2 ring-offset-2 ring-offset-content1': isSelected,
              }
            )}
          />
        </Component>
      </Tooltip>
    )
  }
)

ColorRadioItem.displayName = 'ColorRadioItem'

export default ColorRadioItem

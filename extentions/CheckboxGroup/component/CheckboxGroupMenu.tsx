import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import { Instance, sticky } from 'tippy.js'
import React, { useCallback, useRef, useState } from 'react'
import { Checkbox, CheckboxGroup, CheckboxGroupProps, RadioGroup } from '@nextui-org/react'

import { MenuProps } from '@/components/menus/types'
import { getRenderContainer } from '@/lib/utils'
import PopoverFilterWrapper from '@/components/popover/PopoverFilterWrapper'
import ColorRadioItem, { ColorRadioItemProps } from '@/components/popover/colorRadioItem'

const COLORS = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const
const SIZES = ['sm', 'md', 'lg'] as const
const RADIUS = ['full', 'lg', 'md', 'sm', 'none'] as const

const LABELS_MAP = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  full: 'Full',
  none: 'None',
} as const

export const CheckboxGroupMenu = ({ editor, appendTo }: MenuProps) => {
  const tippyInstance = useRef<Instance | null>(null)

  const getReferenceClientRect = useCallback(() => {
    const container = getRenderContainer(editor, 'node-checkboxGroup')

    return container?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)
  }, [editor])

  const updateCheckboxGroupAttribute = useCallback(
    <K extends keyof CheckboxGroupProps>(key: K, value: CheckboxGroupProps[K]) => {
      if (value) {
        editor
          .chain()
          .focus(undefined, { scrollIntoView: false })
          .updateAttributes('checkboxGroup', { [key]: value })
          .run()
      }
    },
    [editor]
  )

  const shouldShow = useCallback(() => {
    return editor.isEditable && editor.isActive('checkboxGroup')
  }, [editor])

  const [selectedAttributes, setSelectedAttributes] = useState({
    size: 'md',
    radius: 'md',
  })

  const handleValueChange = (key: keyof typeof selectedAttributes) => (values: string[]) => {
    const newValue = values[values.length - 1]

    setSelectedAttributes(prev => ({ ...prev, [key]: newValue }))
    updateCheckboxGroupAttribute(
      key,
      newValue as CheckboxGroupProps[keyof typeof selectedAttributes]
    )
  }

  return (
    <BaseBubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: { modifiers: [{ name: 'flip', enabled: false }] },
        getReferenceClientRect,
        onCreate: (instance: Instance) => (tippyInstance.current = instance),
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: 'popper',
      }}
      updateDelay={10}
    >
      <div className="menu-wrapper -ml-2 flex w-full flex-wrap items-center justify-start gap-2 md:ml-0 md:justify-end">
        <PopoverFilterWrapper title="Color">
          <RadioGroup
            aria-label="Color"
            classNames={{ wrapper: 'gap-2' }}
            orientation="horizontal"
            onChange={e =>
              updateCheckboxGroupAttribute('color', e.target.value as ColorRadioItemProps['color'])
            }
          >
            {COLORS.map(color => (
              <ColorRadioItem
                key={color}
                color={color as ColorRadioItemProps['color']}
                tooltip={color.charAt(0).toUpperCase() + color.slice(1)}
                value={color}
              />
            ))}
          </RadioGroup>
        </PopoverFilterWrapper>

        <PopoverFilterWrapper title="Size">
          <CheckboxGroup
            color="warning"
            orientation="horizontal"
            value={[selectedAttributes.size]}
            onChange={handleValueChange('size')}
          >
            {SIZES.map(size => (
              <Checkbox key={size} size={size} value={size}>
                {LABELS_MAP[size]}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </PopoverFilterWrapper>

        <PopoverFilterWrapper title="Radius">
          <CheckboxGroup
            color="warning"
            orientation="horizontal"
            value={[selectedAttributes.radius]}
            onChange={handleValueChange('radius')}
          >
            {RADIUS.map(radius => (
              <Checkbox key={radius} value={radius}>
                {LABELS_MAP[radius]}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </PopoverFilterWrapper>
      </div>
    </BaseBubbleMenu>
  )
}

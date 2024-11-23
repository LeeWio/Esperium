import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import { useCallback, useRef } from 'react'
import { Instance, sticky } from 'tippy.js'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { RadioGroupProps } from '@nextui-org/radio'

import { getRenderContainer } from '@/lib/utils'
import { MenuProps } from '@/components/menus/types'

export const RadioGroupMenu = ({ editor, appendTo }: MenuProps) => {
  const shouldShow = useCallback(() => {
    return editor.isEditable && editor.isActive('radioGroup')
  }, [editor])
  const tippyInstance = useRef<Instance | null>(null)
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'node-radioGroup')

    return renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)
  }, [editor])

  const setSize = useCallback(
    (size: RadioGroupProps['size']) => {
      if (size) {
        editor.chain().focus(undefined, { scrollIntoView: false }).setRadioGroupSize(size).run()
      }
    },
    [editor]
  )
  const setOrientation = useCallback(
    (orientation: RadioGroupProps['orientation']) => {
      if (orientation) {
        editor
          .chain()
          .focus(undefined, { scrollIntoView: false })
          .setRadioGroupOrientation(orientation)
          .run()
      }
    },
    [editor]
  )

  const setColor = useCallback(
    (color: RadioGroupProps['color']) => {
      if (color) {
        editor.chain().focus(undefined, { scrollIntoView: false }).setRadioGroupColor(color).run()
      }
    },
    [editor]
  )

  return (
    <BaseBubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance
        },
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: 'popper',
      }}
      updateDelay={10}
    >
      <Dropdown size={'sm'}>
        <DropdownTrigger>
          <Button size={'sm'}>{editor.getAttributes('radioGroup')?.size}</Button>
        </DropdownTrigger>
        <DropdownMenu variant={'solid'} onAction={key => setSize(key as RadioGroupProps['size'])}>
          <DropdownItem key={'sm'}>Sm</DropdownItem>
          <DropdownItem key={'md'}>Md</DropdownItem>
          <DropdownItem key="lg">Lg</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown size={'sm'}>
        <DropdownTrigger>
          <Button size={'sm'}>{editor.getAttributes('radioGroup')?.orientation}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant={'solid'}
          onAction={key => setOrientation(key as RadioGroupProps['orientation'])}
        >
          <DropdownItem key={'vertical'}>vertical</DropdownItem>
          <DropdownItem key={'horizontal'}>horizontal</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown size={'sm'}>
        <DropdownTrigger>
          <Button size={'sm'}>{editor.getAttributes('radioGroup')?.color}</Button>
        </DropdownTrigger>
        <DropdownMenu variant={'solid'} onAction={key => setColor(key as RadioGroupProps['color'])}>
          <DropdownItem key={'default'}>Default</DropdownItem>
          <DropdownItem key={'primary'}>Primary</DropdownItem>
          <DropdownItem key={'secondary'}>Secondary</DropdownItem>
          <DropdownItem key="success">Success</DropdownItem>
          <DropdownItem key="warning">Warning</DropdownItem>
          <DropdownItem key="danger">Danger</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </BaseBubbleMenu>
  )
}

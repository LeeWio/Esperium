import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import { Instance, sticky } from 'tippy.js'
import { useCallback, useRef } from 'react'
import {
  Button,
  CheckboxGroupProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'

import { MenuProps } from '@/components/menus/types'
import { getRenderContainer } from '@/lib/utils'

export const CheckboxGroupMenu = ({ editor, appendTo }: MenuProps) => {
  const shouldShow = useCallback(() => {
    return editor.isEditable && editor.isActive('checkboxGroup')
  }, [editor])

  const tippyInstance = useRef<Instance | null>(null)
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'node-checkboxGroup')

    return renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)
  }, [editor])

  const setSize = useCallback(
    (size: CheckboxGroupProps['size']) => {
      if (size) {
        editor.chain().focus(undefined, { scrollIntoView: false }).setCheckboxGroupSize(size).run()
      }
    },
    [editor]
  )
  const setRadius = useCallback(
    (radius: CheckboxGroupProps['radius']) => {
      if (radius) {
        editor
          .chain()
          .focus(undefined, { scrollIntoView: false })
          .setCheckboxGroupRadius(radius)
          .run()
      }
    },
    [editor]
  )
  const setOrientation = useCallback(
    (orientation: CheckboxGroupProps['orientation']) => {
      if (orientation) {
        editor
          .chain()
          .focus(undefined, { scrollIntoView: false })
          .setCheckboxGroupOrientation(orientation)
          .run()
      }
    },
    [editor]
  )

  const setColor = useCallback(
    (color: CheckboxGroupProps['color']) => {
      if (color) {
        editor
          .chain()
          .focus(undefined, { scrollIntoView: false })
          .setCheckboxGroupColor(color)
          .run()
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
          <Button size={'sm'}>{editor.getAttributes('checkboxGroup')?.size}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant={'solid'}
          onAction={key => setSize(key as CheckboxGroupProps['size'])}
        >
          <DropdownItem key={'sm'}>Sm</DropdownItem>
          <DropdownItem key={'md'}>Md</DropdownItem>
          <DropdownItem key="lg">Lg</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown size={'sm'}>
        <DropdownTrigger>
          <Button size={'sm'}>{editor.getAttributes('checkboxGroup')?.orientation}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant={'solid'}
          onAction={key => setOrientation(key as CheckboxGroupProps['orientation'])}
        >
          <DropdownItem key={'vertical'}>vertical</DropdownItem>
          <DropdownItem key={'horizontal'}>horizontal</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown size={'sm'}>
        <DropdownTrigger>
          <Button size={'sm'}>{editor.getAttributes('checkboxGroup')?.color}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant={'solid'}
          onAction={key => setColor(key as CheckboxGroupProps['color'])}
        >
          <DropdownItem key={'default'}>Default</DropdownItem>
          <DropdownItem key={'primary'}>Primary</DropdownItem>
          <DropdownItem key={'secondary'}>Secondary</DropdownItem>
          <DropdownItem key="success">Success</DropdownItem>
          <DropdownItem key="warning">Warning</DropdownItem>
          <DropdownItem key="danger">Danger</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>
          <Button size={'sm'}>{editor.getAttributes('checkboxGroup')?.radius}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant={'solid'}
          onAction={key => setRadius(key as CheckboxGroupProps['radius'])}
        >
          <DropdownItem key={'none'}>None</DropdownItem>
          <DropdownItem key={'base'}>base</DropdownItem>
          <DropdownItem key={'xs'}>xs</DropdownItem>
          <DropdownItem key="sm">sm</DropdownItem>
          <DropdownItem key="md">md</DropdownItem>
          <DropdownItem key="lg">lg</DropdownItem>
          <DropdownItem key="xl">xl</DropdownItem>
          <DropdownItem key="full">Full</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </BaseBubbleMenu>
  )
}

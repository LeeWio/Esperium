import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import { useCallback, useRef } from 'react'
import { Instance, sticky } from 'tippy.js'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  SnippetProps,
} from '@nextui-org/react'

import { MenuProps } from '@/components/menus/types'
import { getRenderContainer } from '@/lib/utils'

export const SnippetMenu = ({ editor, appendTo }: MenuProps) => {
  const shouldShow = useCallback(() => {
    return editor.isEditable && editor.isActive('snippet')
  }, [editor])

  const tippyInstance = useRef<Instance | null>(null)

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'node-snippet')

    return renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)
  }, [editor])

  const setColor = useCallback(
    (color: SnippetProps['color']) => {
      if (color) {
        editor.chain().focus(undefined, { scrollIntoView: false }).setSnippetColor(color).run()
      }
    },
    [editor]
  )

  const setRadius = useCallback(
    (radius: SnippetProps['radius']) => {
      if (radius) {
        editor.chain().focus(undefined, { scrollIntoView: false }).setSnippetRadius(radius).run()
      }
    },
    [editor]
  )

  const setSize = useCallback(
    (size: SnippetProps['size']) => {
      if (size) {
        editor.chain().focus(undefined, { scrollIntoView: false }).setSnippetSize(size).run()
      }
    },
    [editor]
  )

  const setVariant = useCallback(
    (variant: SnippetProps['variant']) => {
      if (variant) {
        editor.chain().focus(undefined, { scrollIntoView: false }).setSnippetVariant(variant).run()
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
          <Button size={'sm'}>{editor.getAttributes('snippet')?.color}</Button>
        </DropdownTrigger>
        <DropdownMenu variant={'solid'} onAction={key => setColor(key as SnippetProps['color'])}>
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
          <Button size={'sm'}>{editor.getAttributes('snippet')?.radius}</Button>
        </DropdownTrigger>
        <DropdownMenu variant={'solid'} onAction={key => setRadius(key as SnippetProps['radius'])}>
          <DropdownItem key={'none'}>None</DropdownItem>
          <DropdownItem key={'sm'}>Sm</DropdownItem>
          <DropdownItem key={'md'}>Md</DropdownItem>
          <DropdownItem key="lg">Lg</DropdownItem>
          <DropdownItem key="full">Full</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown size={'sm'}>
        <DropdownTrigger>
          <Button size={'sm'}>{editor.getAttributes('snippet')?.size}</Button>
        </DropdownTrigger>
        <DropdownMenu variant={'solid'} onAction={key => setSize(key as SnippetProps['size'])}>
          <DropdownItem key={'sm'}>Sm</DropdownItem>
          <DropdownItem key={'md'}>Md</DropdownItem>
          <DropdownItem key="lg">Lg</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown size={'sm'}>
        <DropdownTrigger>
          <Button size={'sm'}>{editor.getAttributes('snippet')?.variant}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant={'solid'}
          onAction={key => setVariant(key as SnippetProps['variant'])}
        >
          <DropdownItem key={'bordered'}>bordered</DropdownItem>
          <DropdownItem key={'flat'}>flat</DropdownItem>
          <DropdownItem key="faded">faded</DropdownItem>
          <DropdownItem key="underlined">underlined</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </BaseBubbleMenu>
  )
}

import { Editor, useEditorState } from '@tiptap/react'

import { ContentPickerOptions } from '../components/ContentTypePicker'

export const useTextmenuContentTypes = (editor: Editor) => {
  return useEditorState({
    editor,
    selector: (ctx): ContentPickerOptions => [
      {
        label: 'Hierarchy',
        id: 'hierarchy',
        children: [
          {
            icon: 'lucide:pilcrow',
            onClick: () =>
              ctx.editor
                .chain()
                .focus()
                .lift('taskItem')
                .liftListItem('listItem')
                .setParagraph()
                .run(),
            id: 'paragraph',
            disabled: () => !ctx.editor.can().setParagraph(),
            isActive: () =>
              ctx.editor.isActive('paragraph') &&
              !ctx.editor.isActive('orderedList') &&
              !ctx.editor.isActive('bulletList') &&
              !ctx.editor.isActive('taskList'),
            label: 'Paragraph',
          },
          {
            icon: 'lucide:heading-1',
            onClick: () =>
              ctx.editor
                .chain()
                .focus()
                .lift('taskItem')
                .liftListItem('listItem')
                .setHeading({ level: 1 })
                .run(),
            id: 'heading1',
            disabled: () => !ctx.editor.can().setHeading({ level: 1 }),
            isActive: () => ctx.editor.isActive('heading', { level: 1 }),
            label: 'Heading 1',
          },
          {
            icon: 'lucide:heading-2',
            onClick: () =>
              ctx.editor
                .chain()
                .focus()
                .lift('taskItem')
                .liftListItem('listItem')
                .setHeading({ level: 2 })
                .run(),
            id: 'heading2',
            disabled: () => !ctx.editor.can().setHeading({ level: 2 }),
            isActive: () => ctx.editor.isActive('heading', { level: 2 }),
            label: 'Heading 2',
          },
          {
            icon: 'lucide:heading-3',
            onClick: () =>
              ctx.editor
                .chain()
                .focus()
                .lift('taskItem')
                .liftListItem('listItem')
                .setHeading({ level: 3 })
                .run(),
            id: 'heading3',
            disabled: () => !ctx.editor.can().setHeading({ level: 3 }),
            isActive: () => ctx.editor.isActive('heading', { level: 3 }),
            label: 'Heading 3',
          },
        ],
      },
      // Lists category
      {
        label: 'Lists',
        id: 'lists',
        children: [
          {
            icon: 'lucide:list',
            onClick: () => ctx.editor.chain().focus().toggleBulletList().run(),
            id: 'bulletList',
            disabled: () => !ctx.editor.can().toggleBulletList(),
            isActive: () => ctx.editor.isActive('bulletList'),
            label: 'Bullet list',
          },
          {
            icon: 'lucide:list-ordered',
            onClick: () => ctx.editor.chain().focus().toggleOrderedList().run(),
            id: 'orderedList',
            disabled: () => !ctx.editor.can().toggleOrderedList(),
            isActive: () => ctx.editor.isActive('orderedList'),
            label: 'Numbered list',
          },
          {
            icon: 'lucide:list-todo',
            onClick: () => ctx.editor.chain().focus().toggleTaskList().run(),
            id: 'todoList',
            disabled: () => !ctx.editor.can().toggleTaskList(),
            isActive: () => ctx.editor.isActive('taskList'),
            label: 'Todo list',
          },
        ],
      },
    ],
  })
}

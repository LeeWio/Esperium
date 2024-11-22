import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { SnippetProps } from '@nextui-org/react'

import { SnippetView } from '@/extentions/Snippet/component/SnippetView'
export type NoteType = 'info' | 'danger' | 'warning'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    Snippet: {
      setSnippet: (attributes?: { type: NoteType } | undefined) => ReturnType

      toggleSnippet: (attributes?: { type: NoteType } | undefined) => ReturnType

      setSnippetColor: (color: SnippetProps['color']) => ReturnType

      setSnippetVariant: (variant: SnippetProps['variant']) => ReturnType

      setSnippetRadius: (radius: SnippetProps['radius']) => ReturnType

      setSnippetSize: (size: SnippetProps['size']) => ReturnType
    }
  }
}

export const Snippet = Node.create({
  name: 'snippet',

  group: 'block',

  content: 'inline',

  draggable: true,

  addAttributes() {
    return {
      variant: {
        default: 'bordered',
        parseHTML: element => element.getAttribute('data-variant'),
        renderHTML: attributes => ({ 'data-variant': attributes.variant }),
      },
      color: {
        default: 'default',
        parseHTML: element => element.getAttribute('data-color'),
        renderHTML: attributes => ({ 'data-color': attributes.color }),
      },
      radius: {
        default: 'sm',
        parseHTML: element => element.getAttribute('data-radius'),
        renderHTML: attributes => ({ 'data-radius': attributes.radius }),
      },
      size: {
        default: 'sm',
        parseHTML: element => element.getAttribute('data-size'),
        renderHTML: attributes => ({ 'data-size': attributes.size }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'snippet',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [this.name, mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(SnippetView)
  },

  addCommands() {
    return {
      setSnippet:
        attributes =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes)
        },
      toggleSnippet:
        attributes =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', attributes)
        },
      setSnippetColor:
        color =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { color })
        },
      setSnippetSize:
        size =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { size })
        },
      setSnippetRadius:
        radius =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { radius })
        },
      setSnippetVariant:
        variant =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { variant })
        },
    }
  },
})

import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { TabView } from './component/TabView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    Tab: {
      insertTab: () => ReturnType
    }
  }
}

export const Tab = Node.create({
  name: 'tab',
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'div[data-type="tab"]',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'tab' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(TabView)
  },

  addCommands() {
    return {
      insertTab:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name)
        },
    }
  },
})

import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { CheckboxGroupProps } from '@nextui-org/react'

import { CheckboxGroupView } from './component/CheckboxGroupView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    CheckboxGroup: {
      insertCheckboxGroup: () => ReturnType

      setCheckboxGroupSize: (size: CheckboxGroupProps['size']) => ReturnType

      setCheckboxGroupOrientation: (orientation: CheckboxGroupProps['orientation']) => ReturnType

      setCheckboxGroupColor: (color: CheckboxGroupProps['color']) => ReturnType

      setCheckboxGroupRadius: (radius: CheckboxGroupProps['radius']) => ReturnType
    }
  }
}

export const CheckboxGroup = Node.create({
  name: 'checkboxGroup',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      defaultValue: {
        default: ['buenos-aires', 'san-francisco'],
        parseHTML: element => JSON.parse(element.getAttribute('data-default-value') || '[]'),
        renderHTML: attributes => ({
          'data-default-value': JSON.stringify(attributes.defaultValue),
        }),
      },

      options: {
        default: [
          { value: 'buenos-aires', label: 'Buenos Aires' },
          { value: 'san-francisco', label: 'San Francisco' },
          { value: 'london', label: 'London' },
        ],
        parseHTML: element => JSON.parse(element.getAttribute('data-options') || '[]'),
        renderHTML: attributes => ({
          'data-options': JSON.stringify(attributes.options),
        }),
      },
      radius: {
        default: 'base',
        parseHTML: element => element.getAttribute('data-radius'),
        renderHTML: attributes => ({ 'data-radius': attributes.radius }),
      },
      color: {
        default: 'default', // Default value
        parseHTML: element => element.getAttribute('data-color'),
        renderHTML: attributes => ({ 'data-color': attributes.color }),
      },
      size: {
        default: 'md',
        parseHTML: element => element.getAttribute('data-size'),
        renderHTML: attributes => ({ 'data-size': attributes.size }),
      },
      orientation: {
        default: 'vertical',
        parseHTML: element => element.getAttribute('data-orientation'),
        renderHTML: attributes => ({ 'data-orientation': attributes.orientation }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="checkboxGroup"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'checkboxGroup' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CheckboxGroupView)
  },

  addCommands() {
    return {
      insertCheckboxGroup:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name)
        },
      setCheckboxGroupSize:
        size =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { size })
        },
      setCheckboxGroupOrientation:
        orientation =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { orientation })
        },
      setCheckboxGroupColor:
        color =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { color })
        },
      setCheckboxGroupRadius:
        radius =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { radius })
        },
    }
  },
})

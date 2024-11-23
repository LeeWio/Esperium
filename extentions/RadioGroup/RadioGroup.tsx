import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { RadioGroupProps } from '@nextui-org/radio'

import { RadioGroupView } from '@/extentions/RadioGroup/component/RadioGroupView'
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    RadioGroup: {
      insertRadioGroup: () => ReturnType

      setRadioGroupSize: (size: RadioGroupProps['size']) => ReturnType

      setRadioGroupOrientation: (orientation: RadioGroupProps['orientation']) => ReturnType

      setRadioGroupColor: (color: RadioGroupProps['color']) => ReturnType
    }
  }
}
export const RadioGroup = Node.create({
  name: 'radioGroup',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      defaultValue: {
        default: 'london',
        parseHTML: element => element.getAttribute('data-default-value'),
        renderHTML: attributes => ({
          'data-default-value': attributes.defaultValue,
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
      color: {
        default: 'default', // Default value
        parseHTML: element => element.getAttribute('data-color'),
        renderHTML: attributes => ({ 'data-color': attributes.color }),
      },
      orientation: {
        default: 'vertical',
        parseHTML: element => element.getAttribute('data-orientation'),
        renderHTML: attributes => ({ 'data-orientation': attributes.orientation }),
      },
      size: {
        default: 'md',
        parseHTML: element => element.getAttribute('data-size'),
        renderHTML: attributes => ({ 'data-size': attributes.size }),
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="radioGroup"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'radioGroup' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(RadioGroupView)
  },
  addCommands() {
    return {
      insertRadioGroup:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name)
        },
      setRadioGroupSize:
        size =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { size })
        },
      setRadioGroupOrientation:
        orientation =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { orientation })
        },
      setRadioGroupColor:
        color =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { color })
        },
    }
  },
})

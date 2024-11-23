import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { SnippetProps } from '@nextui-org/react'

import { SnippetView } from '@/extentions/Snippet/component/SnippetView'

// Extend Tiptap commands to include Snippet-specific operations
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    Snippet: {
      // Command to set a snippet node with optional attributes
      setSnippet: () => ReturnType

      // Command to toggle between a snippet node and a paragraph node
      toggleSnippet: () => ReturnType

      // Command to update the color of the snippet
      setSnippetColor: (color: SnippetProps['color']) => ReturnType

      // Command to update the variant (e.g., bordered, solid) of the snippet
      setSnippetVariant: (variant: SnippetProps['variant']) => ReturnType

      // Command to update the border radius of the snippet
      setSnippetRadius: (radius: SnippetProps['radius']) => ReturnType

      // Command to update the size of the snippet
      setSnippetSize: (size: SnippetProps['size']) => ReturnType
    }
  }
}

// Define the Snippet node
export const Snippet = Node.create({
  // Name of the node
  name: 'snippet',

  // Node group, specifying that it belongs to block elements
  group: 'block',

  // Defines the content the node can have. `inline*` allows inline content.
  content: 'inline*',

  // Makes the node draggable in the editor
  draggable: true,

  // Add attributes that the snippet node supports
  addAttributes() {
    return {
      // Variant attribute (e.g., bordered, shadowed)
      variant: {
        default: 'bordered', // Default value
        parseHTML: element => element.getAttribute('data-variant'), // Parse from HTML
        renderHTML: attributes => ({ 'data-variant': attributes.variant }), // Render to HTML
      },
      // Color attribute
      color: {
        default: 'default', // Default value
        parseHTML: element => element.getAttribute('data-color'),
        renderHTML: attributes => ({ 'data-color': attributes.color }),
      },
      // Radius attribute (e.g., small, medium)
      radius: {
        default: 'sm',
        parseHTML: element => element.getAttribute('data-radius'),
        renderHTML: attributes => ({ 'data-radius': attributes.radius }),
      },
      // Size attribute (e.g., small, medium, large)
      size: {
        default: 'sm',
        parseHTML: element => element.getAttribute('data-size'),
        renderHTML: attributes => ({ 'data-size': attributes.size }),
      },
      // Value attribute, for custom content inside the snippet
      value: {
        default: '', // Default value
        parseHTML: element => element.getAttribute('data-value'),
        renderHTML: attributes => ({ 'data-value': attributes.value }),
      },
    }
  },

  // Define how the node is parsed from HTML
  parseHTML() {
    return [
      {
        tag: 'snippet', // Matches <snippet> tags
      },
    ]
  },

  // Define how the node is rendered to HTML
  renderHTML({ HTMLAttributes }) {
    return [this.name, mergeAttributes(HTMLAttributes), 0] // Render <snippet> with attributes
  },

  // Add a React-based custom view for the node
  addNodeView() {
    return ReactNodeViewRenderer(SnippetView) // Use the SnippetView component
  },

  // Define custom commands for the node
  addCommands() {
    return {
      // Command to set the snippet node with specific attributes
      setSnippet:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name)
        },
      // Command to toggle between a snippet node and a paragraph node
      toggleSnippet:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph')
        },
      // Command to update the color attribute
      setSnippetColor:
        color =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { color })
        },
      // Command to update the size attribute
      setSnippetSize:
        size =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { size })
        },
      // Command to update the radius attribute
      setSnippetRadius:
        radius =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { radius })
        },
      // Command to update the variant attribute
      setSnippetVariant:
        variant =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { variant })
        },
    }
  },
})

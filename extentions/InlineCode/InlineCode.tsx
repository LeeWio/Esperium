import { CodeProps } from "@nextui-org/code";
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from "@tiptap/react";
import { InlineCodeView } from "./component/InlineCodeView";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        inlineCode: {
            /**
             * set inline code
             * @param attributes attributes to set
             */
            setInlineCode: (attributes?: { type: CodeProps['color'] } | undefined) => ReturnType

            /**
             * toogle inline code
             * @param attributes attributes to toggle
             */
            toggleInlineCode: (attributes?: { type: CodeProps['color'] } | undefined) => ReturnType

            /**
             * set inline code color
             * @param color color to set
             * @example editor.commands.toggleCodeBlock({ language: 'javascript' })
             */
            setInlineCodeColor: (color: CodeProps['color']) => ReturnType

            /**
             * 
             * @param radius radius to set
             * @example editor.commands.toggleCodeBlock({ language: 'javascript' })
             */
            setInlineCodeRadius: (radius: CodeProps['radius']) => ReturnType

            /**
             * 
             * @param size size to set
             * @returns 
             */
            setInlineCodeSize: (size: CodeProps['size']) => ReturnType
        }
    }
}
export const InlineCode = Node.create({

    name: 'inlineCode',

    group: 'block',

    content: 'inline*',

    draggable: true,

    addAttributes() {
        return {
            color: {
                default: 'default',
                parseHTML: element => element.getAttribute('data-color'),
                renderHTML: attributes => ({ 'data-color': attributes.color })
            },
            radius: {
                default: 'sm',
                parseHTML: element => element.getAttribute('data-radius'),
                renderHTML: attributes => ({ 'data-radius': attributes.radius })
            },
            size: {
                default: 'sm',
                parseHTML: element => element.getAttribute('data-size'),
                renderHTML: attributes => ({ 'data-size': attributes.size })
            }
        }
    },

    parseHTML() {
        return [{ tag: 'inline-code' }]
    },

    renderHTML({ HTMLAttributes }) {
        return ['inline-code', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return ReactNodeViewRenderer(InlineCodeView)
    },

    addCommands() {
        return {
            setInlineCode: attributes => ({ commands }) => {
                return commands.setNode(this.name, attributes)
            },
            toggleInlineCode: attributes => ({ commands }) => {
                return commands.toggleNode(this.name, "paragraph", attributes)
            },
            setInlineCodeColor: color => ({ commands }) => {
                return commands.updateAttributes(this.name, { color })
            },
            setInlineCodeRadius: radius => ({ commands }) => {
                return commands.updateAttributes(this.name, { radius })
            },
            setInlineCodeSize: size => ({ commands }) => {
                return commands.updateAttributes(this.name, { size })
            }
        }
    },
})
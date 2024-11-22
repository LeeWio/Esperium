import { NodeViewWrapper } from '@tiptap/react'
import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { Snippet } from '@nextui-org/react'

interface SnippetViewProps extends NodeViewProps {}

export const SnippetView: React.FC<SnippetViewProps> = ({ node, updateAttributes, editor }) => {
  return (
    <NodeViewWrapper>
      <Snippet
        classNames={{
          base: 'nextui w-full',
        }}
        color={node.attrs.color}
        radius={node.attrs.radius}
        size={node.attrs.size}
        symbol="#"
        variant={node.attrs.variant}
      >
        npm install @nextui-org/react
      </Snippet>
    </NodeViewWrapper>
  )
}

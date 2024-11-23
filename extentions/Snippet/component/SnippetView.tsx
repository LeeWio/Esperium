import { NodeViewWrapper } from '@tiptap/react'
import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { Input } from '@nextui-org/react'

export const SnippetView: React.FC<NodeViewProps> = ({ node, updateAttributes, editor }) => {
  const handleValueChange = (value: string) => {
    updateAttributes({ value })
  }

  return (
    <NodeViewWrapper>
      <Input
        color={node.attrs.color}
        isReadOnly={!editor.isEditable}
        radius={node.attrs.radius}
        size={node.attrs.size}
        value={node.attrs.value || ''}
        variant={node.attrs.variant}
        onChange={e => handleValueChange(e.target.value)}
      />
    </NodeViewWrapper>
  )
}

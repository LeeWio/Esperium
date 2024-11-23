import React from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import { CheckboxGroup, Checkbox } from '@nextui-org/react'
import { NodeViewProps } from '@tiptap/core'

export const CheckboxGroupView: React.FC<NodeViewProps> = ({ node, updateAttributes, editor }) => {
  const [selected, setSelected] = React.useState(node.attrs.defaultValue || [])

  const handleChange = (newSelected: string[]) => {
    setSelected(newSelected)
    updateAttributes({ defaultValue: newSelected })
  }

  return (
    <NodeViewWrapper>
      <CheckboxGroup
        label={"asdasd"}
        color={node.attrs.color}
        defaultValue={selected}
        isReadOnly={!editor.isEditable}
        orientation={node.attrs.orientation}
        radius={node.attrs.radius}
        size={node.attrs.size}
        onChange={handleChange}
      >
        {node.attrs.options?.map((option: { value: string; label: string }) => (
          <Checkbox key={option.value} value={option.value}>
            {option.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </NodeViewWrapper>
  )
}

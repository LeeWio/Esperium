import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { NodeViewWrapper } from '@tiptap/react'
import { RadioGroup, Radio } from '@nextui-org/react'

export const RadioGroupView: React.FC<NodeViewProps> = ({ node, updateAttributes, editor }) => {
  const [selected, setSelected] = React.useState(node.attrs.defaultValue)

  const handleChange = (newSelected: string) => {
    setSelected(newSelected)
    updateAttributes({ defaultValue: newSelected })
  }

  return (
    <NodeViewWrapper>
      <RadioGroup
        color={node.attrs.color}
        defaultValue={selected}
        isReadOnly={!editor.isEditable}
        label="Select your favorite city"
        orientation={node.attrs.orientation}
        size={node.attrs.size}
        onValueChange={handleChange}
      >
        {node.attrs.options?.map((option: { value: string; label: string }) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </NodeViewWrapper>
  )
}

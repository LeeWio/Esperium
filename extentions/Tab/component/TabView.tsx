import React from 'react'
import { NodeViewProps } from '@tiptap/core'
import { NodeViewWrapper } from '@tiptap/react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'

const tabData = [
  {
    key: 'photos',
    title: 'Photos',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    key: 'music',
    title: 'Music',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    key: 'videos',
    title: 'Videos',
    content:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
]

export const TabView: React.FC<NodeViewProps> = ({ node, updateAttributes, editor }) => {
  const [selected, setSelected] = React.useState('photos')

  return (
    <NodeViewWrapper>
      <Tabs aria-label="Options" selectedKey={selected} onSelectionChange={setSelected as any}>
        {tabData.map(({ key, title, content }) => (
          <Tab key={key} title={title}>
            <Card>
              <CardBody>{content}</CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </NodeViewWrapper>
  )
}

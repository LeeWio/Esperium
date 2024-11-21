import { BubbleMenu, Editor } from '@tiptap/react'
import { CheckboxGroup, Divider } from '@nextui-org/react'
import { memo } from 'react'

import { useTextmenuContentTypes } from './hooks/useTextmenuContentTypes'
import TextMenuItem from './components/TextMenuItem'
import { useTextmenuStates } from './hooks/useTextmenuStates'
import { EditLinkPopover } from './components/EditLinkPopover'
import { ContentTypePicker } from './components/ContentTypePicker'
import { FontFamilyPicker } from './components/FontFamilyPicker'
import { useTextmenuCommands } from '@/components/menus/TextMenu/hooks/useTextmenuCommands'
import { MoreOptionPopover } from './components/MoreOptionPopover'

export const MemoButton = memo(TextMenuItem)
const MemoContentTypePicker = memo(ContentTypePicker)
const MemoFontFamilyPicker = memo(FontFamilyPicker)
const MemoMoreOptionPopover = memo(MoreOptionPopover)

export type TextMenuProps = {
  editor: Editor
}

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)
  const blockOptions = useTextmenuContentTypes(editor)

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      tippyOptions={{
        popperOptions: {
          placement: 'top-start',
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
                padding: 8,
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['bottom-start', 'top-end', 'bottom-end'],
              },
            },
          ],
        },
        duration: 100,
        maxWidth: 'calc(100vw - 16px)',
      }}
      updateDelay={100}
    >
      <CheckboxGroup
        aria-label="Text style options"
        className="rounded-md bg-content1 shadow-small px-1 py-[2px] px-[10px] outline-2"
        orientation="horizontal"
      >
        <MemoContentTypePicker options={blockOptions} />

        <MemoFontFamilyPicker value={states.currentFont || ''} onChange={commands.onSetFont} />

        <Divider
          orientation="vertical"
          className='my-auto'
          style={{ height: '1.5rem' }}
        />

        <MemoButton
          icon="lucide:bold"
          isSelected={states.isBold}
          value="Bold"
          onClick={commands.onBold}
        />
        <MemoButton
          icon="lucide:italic"
          isSelected={states.isItalic}
          value="Italic"
          onClick={commands.onItalic}
        />
        <MemoButton
          icon="lucide:underline"
          isSelected={states.isUnderline}
          value="Underline"
          onClick={commands.onUnderline}
        />
        <MemoButton
          icon="lucide:strikethrough"
          isSelected={states.isStrike}
          value="Strike"
          onClick={commands.onStrike}
        />
        <MemoButton
          icon="lucide:code"
          isSelected={states.isCode}
          value="Code"
          onClick={commands.onCode}
        />
        <MemoButton icon="lucide:square-code" value="CodeBlock" onClick={commands.onCodeBlock} />
        {/*TODO bug 未解决*/}
        <EditLinkPopover onSetLink={commands.onLink} />

        <MemoMoreOptionPopover editor={editor}/>
      </CheckboxGroup>
    </BubbleMenu>
  )
}

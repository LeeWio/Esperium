import { Button, ButtonGroup, CheckboxGroup, cn, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { MemoButton } from "../TextMenu"
import { Icon } from "@iconify/react"
import { Editor } from '@tiptap/react'
import { useTextmenuCommands } from "../hooks/useTextmenuCommands"
import { useTextmenuStates } from "../hooks/useTextmenuStates"

export const MoreOptionPopover = ({ editor }: { editor: Editor }) => {
    const commands = useTextmenuCommands(editor)
    const states = useTextmenuStates(editor)

    return (
        <Popover placement="top" radius="md">
            <PopoverTrigger>
                <Button
                    disableRipple
                    isIconOnly
                    as={Link}
                    color={'default'}
                    size={'sm'}
                    variant={'light'}
                >
                    <Icon fontSize={20} icon={"lucide:ellipsis-vertical"} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-row gap-1">
                <MemoButton
                    icon="lucide:subscript"
                    isSelected={states.isSubscript}
                    value="Subscript"
                    onClick={commands.onSubscript}
                />
                <MemoButton
                    icon="lucide:superscript"
                    isSelected={states.isSuperscript}
                    value="Superscript"
                    onClick={commands.onSuperscript}
                />
                <Divider
                    orientation="vertical"
                    className='my-auto'
                    style={{ height: '1.5rem' }}
                />
                <MemoButton
                    icon="lucide:align-left"
                    isSelected={states.isAlignLeft}
                    value="Align Left"
                    onClick={commands.onAlignLeft}
                />
                <MemoButton
                    icon="lucide:align-center"
                    isSelected={states.isAlignCenter}
                    value="Align Center"
                    onClick={commands.onAlignCenter}
                />
                <MemoButton
                    icon="lucide:align-right"
                    isSelected={states.isAlignRight}
                    value="Align Right"
                    onClick={commands.onAlignRight}
                />
                <MemoButton
                    icon="lucide:align-justify"
                    isSelected={states.isAlignJustify}
                    value="Justify"
                    onClick={commands.onAlignJustify}
                />
                
            </PopoverContent>

        </Popover>
    )
}
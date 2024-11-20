import { Editor, NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React from "react";
import { Code, CodeProps } from "@nextui-org/code";
interface InlineCodeProps {
    editor: Editor;
    getPos: () => number;
    node: Node & {
        attrs: {
            color: CodeProps['color'];
            size: CodeProps['size'];
            radius: CodeProps['radius']
        }
    };
    updateAttributes: (attrs: Record<string, any>) => void;
}
export const InlineCodeView = (props: InlineCodeProps) => {
    const { node } = props;
    const attrs = node.attrs;
    return (
        <NodeViewWrapper>
            <div className = "text-red-500">qqq</div>
        </NodeViewWrapper>
    )
}
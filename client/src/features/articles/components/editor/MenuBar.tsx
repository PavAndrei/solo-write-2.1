import { useEditorState, type Editor } from '@tiptap/react';
import type { FC } from 'react';
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaParagraph,
  FaListOl,
  FaListUl,
  FaFileCode,
  FaRedo,
  FaUndo,
} from 'react-icons/fa';

import { MenuBarButton } from './MenuBarButton';
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu';
import { BiCodeBlock } from 'react-icons/bi';

interface MenuBarProps {
  editor: Editor;
}

export const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <div className="group flex gap-10 pb-2">
      <div className="flex items-center gap-2">
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          isSelected={editorState.isBold}
        >
          <FaBold />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          isSelected={editorState.isItalic}
        >
          <FaItalic />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          isSelected={editorState.isStrike}
        >
          <FaStrikethrough />
        </MenuBarButton>
      </div>
      <div className="flex items-center gap-2">
        <MenuBarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isSelected={editorState.isHeading1}
          className="text-xl"
        >
          <LuHeading1 />
        </MenuBarButton>

        <MenuBarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isSelected={editorState.isHeading2}
          className="text-xl"
        >
          <LuHeading2 />
        </MenuBarButton>

        <MenuBarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isSelected={editorState.isHeading3}
          className="text-xl"
        >
          <LuHeading3 />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isSelected={editorState.isParagraph}
        >
          <FaParagraph />
        </MenuBarButton>
      </div>

      <div className="flex items-center gap-2">
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          isSelected={editorState.isCode}
        >
          <FaFileCode />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isSelected={editorState.isCodeBlock}
        >
          <BiCodeBlock />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isSelected={editorState.isBulletList}
        >
          <FaListUl />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isSelected={editorState.isOrderedList}
        >
          <FaListOl />
        </MenuBarButton>

        {/* <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Clear marks
        </button> */}

        {/* <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          Clear nodes
        </button> */}

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? 'is-active' : ''}
        >
          Blockquote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Hard break
        </button>

        <MenuBarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <FaUndo />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <FaRedo />
        </MenuBarButton>
      </div>
    </div>
  );
};

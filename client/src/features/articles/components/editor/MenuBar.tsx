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
  FaRulerHorizontal,
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaAlignJustify,
  FaHighlighter,
  FaUnderline,
  FaSuperscript,
  FaSubscript,
} from 'react-icons/fa';
import { VscNewline, VscClearAll } from 'react-icons/vsc';
import { GrBlockQuote } from 'react-icons/gr';
import { MdOutlineRemoveDone } from 'react-icons/md';

import { MenuBarButton } from './MenuBarButton';
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
} from 'react-icons/lu';
import { BiCodeBlock } from 'react-icons/bi';
import { characterLimit } from '../../../../constants/articleValidationParams';
import { CharacterCounter } from '../../../../components/ui/CharacterCounter';

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
        isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }) ?? false,
        isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }) ?? false,
        isAlignRight: ctx.editor.isActive({ textAlign: 'right' }) ?? false,
        isAlignJustify: ctx.editor.isActive({ TextAlign: 'justify' }) ?? false,
        charactersCount: ctx.editor.storage.characterCount.characters(),
        wordsCount: ctx.editor.storage.characterCount.words(),
        isHighlighted: ctx.editor.isActive('highlight') ?? false,
        isUnderlined: ctx.editor.isActive('underline') ?? false,
        isSuperscripted: ctx.editor.isActive('superscript') ?? false,
        isSubscripted: ctx.editor.isActive('subscript') ?? false,
      };
    },
  });

  const percentage = editor
    ? Math.round((100 / characterLimit) * editorState.charactersCount)
    : 0;

  return (
    <div className="group flex gap-10 pb-2">
      <CharacterCounter
        charactersCount={editorState.charactersCount}
        characterLimit={characterLimit}
        percentage={percentage}
        wordsCount={editorState.wordsCount}
      />

      <div className="flex items-center gap-2 flex-wrap">
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isSelected={editorState.isHighlighted}
        >
          <FaHighlighter />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          isSelected={editorState.isSubscripted}
        >
          <FaSubscript />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          isSelected={editorState.isSuperscripted}
        >
          <FaSuperscript />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isSelected={editorState.isUnderlined}
        >
          <FaUnderline />
        </MenuBarButton>

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
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          isSelected={editorState.isHeading4}
          className="text-xl"
        >
          <LuHeading4 />
        </MenuBarButton>

        <MenuBarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          isSelected={editorState.isHeading5}
          className="text-xl"
        >
          <LuHeading5 />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isSelected={editorState.isParagraph}
        >
          <FaParagraph />
        </MenuBarButton>

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

        <MenuBarButton
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <MdOutlineRemoveDone />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <VscClearAll />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isSelected={editorState.isBlockquote}
        >
          <GrBlockQuote />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <FaRulerHorizontal />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <VscNewline />
        </MenuBarButton>

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

        <MenuBarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isSelected={editorState.isAlignLeft}
          disabled={editorState.isAlignLeft}
        >
          <FaAlignLeft />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isSelected={editorState.isAlignCenter}
          disabled={editorState.isAlignCenter}
        >
          <FaAlignCenter />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isSelected={editorState.isAlignRight}
          disabled={editorState.isAlignRight}
        >
          <FaAlignRight />
        </MenuBarButton>

        <MenuBarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isSelected={editorState.isAlignJustify}
          disabled={editorState.isAlignJustify}
        >
          <FaAlignJustify />
        </MenuBarButton>
      </div>
    </div>
  );
};

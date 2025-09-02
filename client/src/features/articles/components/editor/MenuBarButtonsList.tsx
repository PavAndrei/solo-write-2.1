import { MenuBarButton } from './MenuBarButton';
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
} from 'react-icons/lu';
import { BiCodeBlock } from 'react-icons/bi';
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
import type { FC } from 'react';
import type { Editor } from '@tiptap/react';
import type { EditorStateType } from '../../types/editor.types';

interface MenuBarButtonsList {
  editorState: EditorStateType;
  editor: Editor;
}

export const MenuBarButtonsList: FC<MenuBarButtonsList> = ({
  editorState,
  editor,
}) => {
  if (!editorState || !editor) {
    return null;
  }

  const buttons = [
    {
      icon: <FaUndo />,
      action: () => editor.chain().focus().undo().run(),
      disabled: !editorState.canUndo,
    },
    {
      icon: <FaRedo />,
      action: () => editor.chain().focus().redo().run(),
      disabled: !editorState.canRedo,
    },

    {
      icon: <FaBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      disabled: !editorState.canBold,
      isSelected: editorState.isBold,
    },
    {
      icon: <FaItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editorState.canItalic,
      isSelected: editorState.isItalic,
    },
    {
      icon: <FaUnderline />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isSelected: editorState.isUnderlined,
    },
    {
      icon: <FaStrikethrough />,
      action: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editorState.canStrike,
      isSelected: editorState.isStrike,
    },
    {
      icon: <FaHighlighter />,
      action: () => editor.chain().focus().toggleHighlight().run(),
      isSelected: editorState.isHighlighted,
    },
    {
      icon: <FaSuperscript />,
      action: () => editor.chain().focus().toggleSuperscript().run(),
      isSelected: editorState.isSuperscripted,
    },
    {
      icon: <FaSubscript />,
      action: () => editor.chain().focus().toggleSubscript().run(),
      isSelected: editorState.isSubscripted,
    },

    {
      icon: <LuHeading1 />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isSelected: editorState.isHeading1,
      className: 'text-xl',
    },
    {
      icon: <LuHeading2 />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isSelected: editorState.isHeading2,
      className: 'text-xl',
    },
    {
      icon: <LuHeading3 />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isSelected: editorState.isHeading3,
      className: 'text-xl',
    },
    {
      icon: <LuHeading4 />,
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isSelected: editorState.isHeading4,
      className: 'text-xl',
    },
    {
      icon: <LuHeading5 />,
      action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      isSelected: editorState.isHeading5,
      className: 'text-xl',
    },
    {
      icon: <FaParagraph />,
      action: () => editor.chain().focus().setParagraph().run(),
      isSelected: editorState.isParagraph,
    },

    {
      icon: <FaListUl />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isSelected: editorState.isBulletList,
    },
    {
      icon: <FaListOl />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isSelected: editorState.isOrderedList,
    },
    {
      icon: <BiCodeBlock />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isSelected: editorState.isCodeBlock,
    },
    {
      icon: <FaFileCode />,
      action: () => editor.chain().focus().toggleCode().run(),
      disabled: !editorState.canCode,
      isSelected: editorState.isCode,
    },
    {
      icon: <GrBlockQuote />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isSelected: editorState.isBlockquote,
    },

    {
      icon: <FaAlignLeft />,
      action: () => editor.chain().focus().setTextAlign('left').run(),
      isSelected: editorState.isAlignLeft,
      disabled: editorState.isAlignLeft,
    },
    {
      icon: <FaAlignCenter />,
      action: () => editor.chain().focus().setTextAlign('center').run(),
      isSelected: editorState.isAlignCenter,
      disabled: editorState.isAlignCenter,
    },
    {
      icon: <FaAlignRight />,
      action: () => editor.chain().focus().setTextAlign('right').run(),
      isSelected: editorState.isAlignRight,
      disabled: editorState.isAlignRight,
    },
    {
      icon: <FaAlignJustify />,
      action: () => editor.chain().focus().setTextAlign('justify').run(),
      isSelected: editorState.isAlignJustify,
      disabled: editorState.isAlignJustify,
    },

    {
      icon: <FaRulerHorizontal />,
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: <VscNewline />,
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: <MdOutlineRemoveDone />,
      action: () => editor.chain().focus().unsetAllMarks().run(),
    },
    {
      icon: <VscClearAll />,
      action: () => editor.chain().focus().clearNodes().run(),
    },
  ];

  return (
    <div>
      <span className="block mb-1.5">Tools:</span>
      <div className="flex items-center gap-2 flex-wrap">
        {buttons.map((btn, i) => (
          <MenuBarButton
            key={i}
            onClick={btn.action}
            isSelected={btn.isSelected}
            disabled={btn.disabled}
            className={btn.className}
          >
            {btn.icon}
          </MenuBarButton>
        ))}
      </div>
    </div>
  );
};

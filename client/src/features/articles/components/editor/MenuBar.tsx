import { useEditorState, type Editor } from '@tiptap/react';
import type { FC } from 'react';

import { characterLimit } from '../../../../constants/articleValidationParams';
import { CharacterCounter } from '../../../../components/ui/CharacterCounter';
import { AiToolbar } from './AiToolbar';
import { MenuBarButtonsList } from './MenuBarButtonsList';

interface MenuBarProps {
  editor: Editor;
}

export const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      canBold: ctx.editor.can().chain().toggleBold().run(),
      isItalic: ctx.editor.isActive('italic'),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),
      isStrike: ctx.editor.isActive('strike'),
      canStrike: ctx.editor.can().chain().toggleStrike().run(),
      isCode: ctx.editor.isActive('code'),
      canCode: ctx.editor.can().chain().toggleCode().run(),
      canClearMarks: ctx.editor.can().chain().unsetAllMarks().run(),
      isParagraph: ctx.editor.isActive('paragraph'),
      isHeading1: ctx.editor.isActive('heading', { level: 1 }),
      isHeading2: ctx.editor.isActive('heading', { level: 2 }),
      isHeading3: ctx.editor.isActive('heading', { level: 3 }),
      isHeading4: ctx.editor.isActive('heading', { level: 4 }),
      isHeading5: ctx.editor.isActive('heading', { level: 5 }),
      isBulletList: ctx.editor.isActive('bulletList'),
      isOrderedList: ctx.editor.isActive('orderedList'),
      isCodeBlock: ctx.editor.isActive('codeBlock'),
      isBlockquote: ctx.editor.isActive('blockquote'),
      canUndo: ctx.editor.can().chain().undo().run(),
      canRedo: ctx.editor.can().chain().redo().run(),
      isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }),
      isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }),
      isAlignRight: ctx.editor.isActive({ textAlign: 'right' }),
      isAlignJustify: ctx.editor.isActive({ textAlign: 'justify' }),
      charactersCount: ctx.editor.storage.characterCount.characters(),
      wordsCount: ctx.editor.storage.characterCount.words(),
      isHighlighted: ctx.editor.isActive('highlight'),
      isUnderlined: ctx.editor.isActive('underline'),
      isSuperscripted: ctx.editor.isActive('superscript'),
      isSubscripted: ctx.editor.isActive('subscript'),
    }),
  });

  const percentage = editor
    ? Math.round((100 / characterLimit) * editorState.charactersCount)
    : 0;

  return (
    <div className="group flex gap-10 pb-2">
      <div>
        <span className="mb-1.5 block">Limit: </span>
        <div className="">
          <CharacterCounter
            charactersCount={editorState.charactersCount}
            characterLimit={characterLimit}
            percentage={percentage}
            wordsCount={editorState.wordsCount}
          />
        </div>
      </div>

      <AiToolbar editor={editor} />

      <MenuBarButtonsList editor={editor} editorState={editorState} />
    </div>
  );
};

import { useEditorState } from '@tiptap/react';

export type EditorStateType = ReturnType<
  typeof useEditorState<{
    isBold: boolean;
    canBold: boolean;
    isItalic: boolean;
    canItalic: boolean;
    isStrike: boolean;
    canStrike: boolean;
    isCode: boolean;
    canCode: boolean;
    canClearMarks: boolean;
    isParagraph: boolean;
    isHeading1: boolean;
    isHeading2: boolean;
    isHeading3: boolean;
    isHeading4: boolean;
    isHeading5: boolean;
    isBulletList: boolean;
    isOrderedList: boolean;
    isCodeBlock: boolean;
    isBlockquote: boolean;
    canUndo: boolean;
    canRedo: boolean;
    isAlignLeft: boolean;
    isAlignCenter: boolean;
    isAlignRight: boolean;
    isAlignJustify: boolean;
    charactersCount: number;
    wordsCount: number;
    isHighlighted: boolean;
    isUnderlined: boolean;
    isSuperscripted: boolean;
    isSubscripted: boolean;
  }>
>;

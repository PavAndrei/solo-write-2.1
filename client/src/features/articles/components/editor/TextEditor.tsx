import { Placeholder, CharacterCount } from '@tiptap/extensions';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaPenAlt } from 'react-icons/fa';
import { MenuBar } from './MenuBar';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';

import { characterLimit } from '../../../../constants/articleValidationParams';
import type { FC } from 'react';

interface TextEditorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onLimitChange: (overLimit: boolean) => void;
  error?: string;
}

export const TextEditor: FC<TextEditorProps> = ({
  label,
  value,
  onChange,
  onLimitChange,
  error,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Share your thoughts with us...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CharacterCount.configure(),
      Highlight,
      Superscript,
      Subscript,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'min-h-[156px] border border-gray-500 rounded shadow-md hover:shadow-gray-300 dark:hover:shadow-gray-500 focus:border-gray-900 dark:focus:border-gray-100 focus:shadow-gray-300 dark:focus:shadow-gray-500 focus-visible:shadow-gray-500 focus-visible:inset-shadow-gray-600 dark:inset-shadow-gray-100 focus-visible:inset-shadow-sm py-2 px-14 transititon ease-in-out duration-300',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      const count = editor.storage.characterCount.characters();
      onLimitChange(count > characterLimit);
    },
  });

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-medium text-lg cursor-default">{label}</span>
      {editor && <MenuBar editor={editor} />}
      <div className="relative group">
        <EditorContent editor={editor} />
        <FaPenAlt
          className="absolute top-3.5 left-3 text-gray-500 transition-colors duration-300 ease-in-out
                 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

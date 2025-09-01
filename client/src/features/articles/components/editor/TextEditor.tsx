import { Placeholder } from '@tiptap/extensions';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaPenAlt } from 'react-icons/fa';
import { MenuBar } from './MenuBar';

export const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Share your thoughts with us...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class:
          'min-h-[156px] border border-gray-500 rounded shadow-md hover:shadow-gray-300 dark:hover:shadow-gray-500 focus:border-gray-900 dark:focus:border-gray-100 focus:shadow-gray-300 dark:focus:shadow-gray-500 focus-visible:shadow-gray-500 focus-visible:inset-shadow-gray-600 dark:inset-shadow-gray-100 focus-visible:inset-shadow-sm py-2 px-14 transititon ease-in-out duration-300',
      },
    },
  });

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-medium text-lg cursor-default">Text</span>
      <MenuBar editor={editor} />
      <div className="relative group">
        <EditorContent editor={editor} />
        <FaPenAlt
          className="absolute top-3.5 left-3 text-gray-500 transition-colors duration-300 ease-in-out
                 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100"
        />
      </div>
    </div>
  );
};

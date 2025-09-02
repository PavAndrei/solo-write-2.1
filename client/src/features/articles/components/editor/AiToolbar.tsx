import { useState, type FC } from 'react';
import { Editor } from '@tiptap/react';
import {
  AiButtonConfig,
  BASE_API_URL,
  type AiAction,
} from '../../../../constants/api';
import { MenuBarButton } from './MenuBarButton';

interface AiToolbarProps {
  editor: Editor | null;
}

export const AiToolbar: FC<AiToolbarProps> = ({ editor }) => {
  const [isLoading, setLoading] = useState(false);

  const safeParseHtml = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.innerHTML;
  };

  const handleAiAction = async (action: AiAction) => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc
      .textBetween(from, to, '\n', '\n')
      .trim();
    if (!selectedText) return;

    try {
      setLoading(true);

      const res = await fetch(`${BASE_API_URL}/ai/edit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action, text: selectedText }),
      });

      const json = await res.json();
      if (!res.ok || !json.result) {
        console.error(json);
        return;
      }

      const html = json.result.trim();
      const safeHtml = safeParseHtml(html);

      editor.chain().focus().deleteRange({ from, to }).run();

      editor.commands.insertContent(safeHtml);
    } catch (err) {
      console.error('AI action failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {Object.entries(AiButtonConfig).map(([action, { label }]) => (
        <MenuBarButton
          key={action}
          onClick={() => handleAiAction(action as AiAction)}
          disabled={isLoading || !editor?.isEditable}
        >
          {isLoading ? '...' : label}
        </MenuBarButton>
      ))}
    </div>
  );
};

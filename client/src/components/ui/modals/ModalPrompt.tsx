import { useState, type FC } from 'react';
import { Button } from '../Button';

interface ModalPromptProps {
  title: string;
  message: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

export const ModalPrompt: FC<ModalPromptProps> = ({
  title,
  message,
  onSubmit,
  onCancel,
}) => {
  const [input, setInput] = useState('');

  return (
    <div className="border rounded-md bg-gray-200 dark:bg-gray-700 w-100">
      <div className="p-5 flex flex-col items-center gap-5 text-center">
        <h3 className="text-xl">{title}</h3>
        <p>{message}</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-2 py-1 rounded w-full"
          placeholder="Введите значение..."
        />
        <div className="flex gap-2 mt-4">
          <Button ariaLabel="Submit" onClick={() => onSubmit(input)}>
            OK
          </Button>
          <Button ariaLabel="Cancel" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

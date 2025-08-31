import React from 'react';

import { Button } from '../Button';

interface ModalConfirmProps {
  message: string;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = ({
  message,
  title,
  onConfirm,
  onCancel,
}) => (
  <div className="border rounded-md bg-gray-200 dark:bg-gray-700 w-100">
    <div className="p-5 flex flex-col items-center gap-5 text-center">
      <h3 className="text-xl">{title}</h3>
      <p>{message}</p>
      <div className="flex gap-2">
        <Button ariaLabel="Confirm your action" onClick={onConfirm}>
          OK
        </Button>
        <Button ariaLabel="Cancel" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  </div>
);

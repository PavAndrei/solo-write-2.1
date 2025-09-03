import React from 'react';
import { Button } from '../../../../components/ui/Button';

interface ModalAlertProps {
  message: string;
  title: string;
  onClose: () => void;
}

export const ModalAlert: React.FC<ModalAlertProps> = ({
  message,
  title,
  onClose,
}) => (
  <div className="border rounded-md bg-gray-200 dark:bg-gray-700 w-100">
    <div className="p-5 flex flex-col items-center gap-5 text-center">
      <h3 className="text-xl">{title}</h3>
      <p>{message}</p>
      <Button ariaLabel="Confirm" onClick={onClose}>
        OK
      </Button>
    </div>
  </div>
);

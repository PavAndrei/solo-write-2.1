// src/components/ModalAlert.tsx
import React from 'react';

interface ModalAlertProps {
  message: string;
  onClose: () => void;
}

export const ModalAlert: React.FC<ModalAlertProps> = ({ message, onClose }) => (
  <div className="border rounded-md bg-gray-200 dark:bg-gray-700 w-100">
    <div className="p-5 flex flex-col items-center gap-5">
      <p>{message}</p>
      <button onClick={onClose}>OK</button>
    </div>
  </div>
);

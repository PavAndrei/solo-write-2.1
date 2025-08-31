// src/components/ModalRoot.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { respondModal } from '../../../features/modal/slices/modalSlice';
import { ModalConfirm } from './ModalConfirm';
import { ModalAlert } from './ModalAlert';

const ModalRoot: React.FC = () => {
  const modals = useAppSelector((state) => state.modal.modals);
  const dispatch = useAppDispatch();

  if (modals.length === 0) return null;

  const { id, type, message } = modals[0];

  const handleClose = (result: boolean) => {
    dispatch(respondModal({ id, result }));
  };

  console.log(type);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {type === 'confirm' && (
        <ModalConfirm
          message={message}
          onConfirm={() => handleClose(true)}
          onCancel={() => handleClose(false)}
        />
      )}
      {type === 'alert' && (
        <ModalAlert message={message} onClose={() => handleClose(true)} />
      )}
    </div>
  );
};

export default ModalRoot;

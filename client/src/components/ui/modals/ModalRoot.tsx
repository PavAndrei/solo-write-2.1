import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { respondModal } from '../../../features/modal/slices/modalSlice';
import { ModalConfirm } from './ModalConfirm';
import { ModalAlert } from './ModalAlert';
import { IoMdCloseCircle } from 'react-icons/io';

const ModalRoot: FC = () => {
  const modals = useAppSelector((state) => state.modal.modals);
  const dispatch = useAppDispatch();

  if (modals.length === 0) return null;

  const { id, type, message, title } = modals[0];

  const handleClose = (result: boolean) => {
    dispatch(respondModal({ id, result }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="flex items-center justify-center gap-2 relative w-fit h-fit mx-auto my-35">
        <button
          onClick={() => handleClose(false)}
          aria-label="close the dialogue window"
          className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-500 hover:text-gray-900 hover:dark:text-gray-100 transition-colors duration-300 ease-in-out"
        >
          <IoMdCloseCircle />
        </button>
        {type === 'confirm' && (
          <ModalConfirm
            message={message}
            title={title}
            onConfirm={() => handleClose(true)}
            onCancel={() => handleClose(false)}
          />
        )}
        {type === 'alert' && (
          <ModalAlert
            message={message}
            title={title}
            onClose={() => handleClose(true)}
          />
        )}
      </div>
    </div>
  );
};

export default ModalRoot;

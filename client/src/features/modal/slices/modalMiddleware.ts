// src/store/modalMiddleware.ts
import {
  confirmModal,
  alertModal,
  promptModal,
  respondModal,
  showModal,
  hideModal,
} from './modalSlice';
import type { Middleware } from '@reduxjs/toolkit';

export const modalMiddleware: Middleware = (store) => {
  let nextId = 0;
  const resolvers = new Map<number, (value: boolean | string) => void>();

  return (next) => (action) => {
    if (
      confirmModal.match(action) ||
      alertModal.match(action) ||
      promptModal.match(action)
    ) {
      const id = ++nextId;
      const type = confirmModal.match(action)
        ? 'confirm'
        : alertModal.match(action)
        ? 'alert'
        : 'prompt';

      const { title, message } = action.payload;
      store.dispatch(showModal({ id, type, title, message }));

      return new Promise<boolean | string>((resolve) => {
        resolvers.set(id, resolve);
      });
    }

    if (respondModal.match(action)) {
      const { id, result } = action.payload;
      const resolve = resolvers.get(id);
      if (resolve) {
        resolve(result);
        resolvers.delete(id);
        store.dispatch(hideModal(id));
      }
      return;
    }

    return next(action);
  };
};

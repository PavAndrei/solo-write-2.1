// src/store/modalMiddleware.ts
import {
  confirmModal,
  alertModal,
  respondModal,
  showModal,
  hideModal,
} from './modalSlice';
import type { Middleware } from '@reduxjs/toolkit';

export const modalMiddleware: Middleware = (store) => {
  let nextId = 0;
  const resolvers = new Map<number, (value: boolean) => void>();

  return (next) => (action) => {
    if (confirmModal.match(action) || alertModal.match(action)) {
      const id = ++nextId;
      const type = confirmModal.match(action) ? 'confirm' : 'alert';
      const message = action.payload;

      store.dispatch(showModal({ id, type, message }));

      return new Promise<boolean>((resolve) => {
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

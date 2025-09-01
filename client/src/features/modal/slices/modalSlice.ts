// src/store/modalSlice.ts
import {
  createSlice,
  createAction,
  type PayloadAction,
} from '@reduxjs/toolkit';

// payloadы для экшенов
export const confirmModal = createAction<{
  title: string;
  message: string;
}>('modal/confirm');
export const alertModal = createAction<{
  title: string;
  message: string;
}>('modal/alert');
export const promptModal = createAction<{
  title: string;
  message: string;
}>('modal/prompt');

export const respondModal = createAction<{
  id: number;
  result: boolean | string;
}>('modal/respond');

// единичная модалка в очереди
interface ModalItem {
  id: number;
  type: 'confirm' | 'alert' | 'prompt';
  message: string;
  title: string;
}

interface ModalState {
  modals: ModalItem[];
}

const initialState: ModalState = { modals: [] };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<ModalItem>) {
      state.modals.push(action.payload);
    },
    hideModal(state, action: PayloadAction<number>) {
      state.modals = state.modals.filter((m) => m.id !== action.payload);
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;

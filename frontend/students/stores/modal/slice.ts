import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModal } from 'students/models';

const initialModalState: IModal = {
  show: false,
  modalKey: ''
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    open: (state, action: PayloadAction<IModal['modalKey']>) => {
      state.show = true;
      state.modalKey = action.payload;
    },
    close: () => {
      return initialModalState;
    }
  }
});

const { reducer, actions } = modalSlice;

export { actions };

export default reducer;

import { Selector } from '@reduxjs/toolkit';

import { tAppState } from '../rootStore';

const selectDocument: Selector<tAppState, tAppState['document']> = (state) =>
  state.document;

const documentSelectors = {
  selectDocument
};

export default documentSelectors;

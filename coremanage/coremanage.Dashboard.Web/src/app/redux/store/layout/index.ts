import { combineReducers } from 'redux';

import { LayoutModalState, LayoutModalReducer } from './layout-modal.reducer';


export interface LayoutState {
  layoutModal?: LayoutModalState;
};

export const layoutReducer = combineReducers<LayoutState>({
  layoutModal: LayoutModalReducer
});
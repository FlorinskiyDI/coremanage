import { IPayloadAction } from '../../util';
import { LayoutActions, LayoutActionTypes } from '../../actions/layout.actions';
import { List, Map, Record, fromJS} from 'immutable';

// model
export interface LayoutModalModel {
  isOpen: boolean;
  modalType: string;
  extraData: any;
};

// states
export interface LayoutModalState extends Map<string, any>, LayoutModalModel {
  set: (prop: string, val: any) => LayoutModalState;
  merge: (other: any) => LayoutModalState;
};

// record
export const LayoutModalRecord = Record({
  isOpen: false,
  modalType: null,
  extraData: null
});

// init
export const INITIAL_STATE = new LayoutModalRecord(
    (<any>Object).assign(
      {},
      {
        isOpen: false,
        modalType: null,
        extraData: null
      },
      {}
    )
  ) as LayoutModalState;


export function LayoutModalReducer(
  state = INITIAL_STATE,
  action: IPayloadAction<LayoutModalState, string>
): any {
  switch (action.type) {

    case LayoutActionTypes.OPEN_LAYOUT_MODAL:
     return state.merge({
          isOpen: action.payload.isOpen,
          modalType: action.payload.modalType,
          extraData: Map(action.payload.extraData)
      });

    case LayoutActionTypes.CLOSE_LAYOUT_MODAL:
      return state.merge({
          isOpen: false,
          modalType: null,
          extraData: null
      });

    default:
        return state;

  }
}
import * as fromSidebarActions from '../actions/sidebar.action';
import produce from 'immer';

export interface State {
  showSidenav: boolean;
}

export const initialState: State = {
  showSidenav: false
};

export const reducer = (state: State = initialState, action: fromSidebarActions.SidebarAction) =>
  produce(state, draftState => {
    switch (action.type) {
      case fromSidebarActions.OPEN:
        draftState.showSidenav = true;
        break;
      case fromSidebarActions.CLOSE:
        draftState.showSidenav = false;
    }
  }
);





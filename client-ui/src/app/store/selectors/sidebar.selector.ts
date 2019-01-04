import * as fromRoot from '../reducers/index';
import * as fromSidebar from '../reducers/sidebar.reducer';
import {createSelector} from '@ngrx/store';

export const getSidebarState = (state: fromRoot.AppState) => state.sidebarState;

export const getShowSidenav = createSelector(
  getSidebarState,
  (state: fromSidebar.State) => state.showSidenav
);

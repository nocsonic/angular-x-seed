import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromSidebar from './sidebar.reducer';

export interface AppState {
  sidebarState: fromSidebar.State;
}

export const reducers: ActionReducerMap<AppState> = {
  sidebarState: fromSidebar.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

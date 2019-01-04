import * as fromSidebar from './sidebar.reducer';
import * as fromSidebarActions from '../actions/sidebar.action';

describe('Sidebar Reducer', () => {
  it('should return initial state ', () => {
    const action: any = {};
    const state = fromSidebar.reducer(undefined, action);
    expect(state).toEqual(fromSidebar.initialState);
  });

  it('should set showSidebar to true with Open action', () => {
    const state = fromSidebar.reducer(fromSidebar.initialState, new fromSidebarActions.Open());
    expect(state.showSidenav).toEqual(true);
  });

  it('should set showSidebar to false with Close action', () => {
    const state = fromSidebar.reducer(fromSidebar.initialState, new fromSidebarActions.Close());
    expect(state.showSidenav).toEqual(false);
  });
});

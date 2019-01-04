import * as fromSidebar from '../reducers/sidebar.reducer';
import * as fromSidebarSelectors from './sidebar.selector';

describe('Sidebar Selector', () => {

  it('should get sidebarState', () => {
    const sidebarState: fromSidebar.State = fromSidebarSelectors.getSidebarState(
      {sidebarState: fromSidebar.initialState}
    );
    expect(sidebarState).toBe(fromSidebar.initialState);
  });

  it('should get showSidebar', () => {
    const sidebarState: boolean = fromSidebarSelectors.getShowSidenav(
      {sidebarState: fromSidebar.initialState}
    );
    expect(sidebarState).toBe(fromSidebar.initialState.showSidenav);
  });

});

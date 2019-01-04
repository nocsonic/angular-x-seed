import * as fromSidebarActions from './sidebar.action';

describe('Sidebar Actions', () => {
  it('should create open action', () => {
    const action = new fromSidebarActions.Open();
    expect({...action}).toEqual({type: fromSidebarActions.OPEN});
  });

  it('should create close action', () => {
    const action = new fromSidebarActions.Close();
    expect({...action}).toEqual({type: fromSidebarActions.CLOSE});
  });
});

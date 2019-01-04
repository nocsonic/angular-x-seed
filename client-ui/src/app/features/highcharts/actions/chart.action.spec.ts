import * as fromChartActions from './chart.action';

describe('PointMouseOver', () => {
  it('should create an action', () => {
    const mouseEvent: MouseEvent = new MouseEvent('mouseOver');
    const action = new fromChartActions.PointMouseOver(mouseEvent);
    expect({...action}).toEqual({type: fromChartActions.ChartActionTypes.PointMouseOver, payload: mouseEvent});
  });
});


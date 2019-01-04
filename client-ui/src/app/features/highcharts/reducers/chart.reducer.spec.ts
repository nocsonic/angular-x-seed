import * as fromCharts from './chart.reducer';
import {PointMouseOver} from '../actions/chart.action';

describe('ChartReducer', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const chartState: fromCharts.State = fromCharts.reducer(undefined, action);
    expect(chartState).toBe(fromCharts.initialState);
  });

  it('should set pointMouseOverEvent', () => {
    const { initialState } = fromCharts;
    const mouseEvent: MouseEvent = new MouseEvent('mouseOver');
    const state = fromCharts.reducer(initialState, new PointMouseOver(mouseEvent));
    expect(state.pointMouseOverEvent).toBe(mouseEvent);
  });
});

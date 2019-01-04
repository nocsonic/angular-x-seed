import * as fromChartActions from '../actions/chart.action';
import produce from 'immer';

export interface State {
  pointMouseOverEvent: MouseEvent;
}

export const initialState: State = {
  pointMouseOverEvent: null
};

export const reducer = (state: State = initialState, action: fromChartActions.ChartAction) =>
  produce<State>(state, draft  => {
    switch (action.type) {
      case fromChartActions.ChartActionTypes.PointMouseOver: {
        (<any>draft).pointMouseOverEvent = action.payload;
      }
    }
  });

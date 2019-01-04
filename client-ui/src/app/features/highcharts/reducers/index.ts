import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromChart from './chart.reducer';

export const HIGHCHARTS_STATE = 'highchartsState';

export interface State {
  chartState: fromChart.State;
}

export const reducers: ActionReducerMap<State> = {
  chartState: fromChart.reducer
};

export const selectHighchartState = createFeatureSelector<State>(HIGHCHARTS_STATE);

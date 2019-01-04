import { State } from './../reducers/chart.reducer';
import { selectHighchartState } from './../reducers/index';
import * as _ from 'lodash';
import * as fromFeature from '../reducers';
import {createSelector} from '@ngrx/store';

export const selectChartState = createSelector(
  fromFeature.selectHighchartState,
  highchartsState => highchartsState.chartState
);

export const selectPointMouseOverEvent = createSelector(
  selectChartState,
  chartState => chartState.pointMouseOverEvent
);

export const selectPointXValue = createSelector(
  selectPointMouseOverEvent,
  pointMouseOverEvent => !_.isNull(pointMouseOverEvent) ? <number>(<any>pointMouseOverEvent.target).x : null
);


import {Action} from '@ngrx/store';

export enum ChartActionTypes {
  PointMouseOver = '[Highcharts] Point mouse over'
}

export class PointMouseOver implements Action {
  readonly type: string = ChartActionTypes.PointMouseOver;

  constructor(public payload: MouseEvent) {}
}

export type ChartAction = PointMouseOver;

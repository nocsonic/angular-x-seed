import { Action } from '@ngrx/store';
import { ErrorModel } from "@app/business-layer/models";
import { ErrorActionTypes } from "@app/business-layer/shared-types/actions";

export class ReportError implements Action {
  public readonly type = ErrorActionTypes.REPORT_ERROR;
  constructor(public payload: ErrorModel) {  }
}

export class RemoveError implements Action {
  public readonly type = ErrorActionTypes.REMOVE_ERROR;
  constructor(public payload: ErrorModel) { }
}

export type Actions =
      ReportError
      | RemoveError;


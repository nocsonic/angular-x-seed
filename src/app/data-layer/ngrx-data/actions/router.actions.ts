import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';
import { RouterActionTypes} from "@app/business-layer/shared-types/actions";

export class Go implements Action {
  readonly type = RouterActionTypes.GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {
    if (!(payload.path.indexOf('login') > -1 || payload.path.indexOf('page') > -1)) {
      payload.path.unshift('page');
    }
  }
}

export class Back implements Action {
  readonly type = RouterActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.FORWARD;
}

export type Actions = Go | Back | Forward;

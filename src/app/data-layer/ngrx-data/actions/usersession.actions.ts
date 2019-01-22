import { Action } from '@ngrx/store';
import { SessionModel,LoginModel, ErrorModel } from '../../../business-layer/models/index';
import { UserSessionActionTypes } from "@app/business-layer/shared-types/actions";

export class AppStartLoginClear implements Action {
  public readonly type = UserSessionActionTypes.APP_START_CLEAR_LOGIN;
}

export class UserLoginAttempt implements Action {
  public readonly type = UserSessionActionTypes.LOGIN_USER_ATTEMPT;
  constructor(public payload: LoginModel) {  }
}


export class UserLoginSuccess implements Action {
  public readonly type =  UserSessionActionTypes.LOGIN_USER_SUCCESS;
  constructor(public payload:any) {
  }
}

export class UserLoginFailure implements Action {
  public readonly type =  UserSessionActionTypes.LOGIN_USER_FAILURE;
  constructor(public payload: ErrorModel) {}
}



export class UserLogoutAttempt implements Action {
  public readonly  type =  UserSessionActionTypes.LOGOUT_USER_ATTEMPT;
  constructor() {}
}

export class UserLogoutSuccess implements Action {
  public readonly  type =  UserSessionActionTypes.LOGOUT_USER_SUCCESS;
}

export class UserLogoutFailure implements Action {
  public readonly  type =  UserSessionActionTypes.LOGOUT_USER_FAILURE;
}


export class GetSessionUser implements Action {
  public readonly type =  UserSessionActionTypes.GET_SESSION_USER_SUCCESS;
  constructor(public payload: SessionModel) { }
}




export type Actions =
     AppStartLoginClear
      | UserLoginAttempt
      | UserLoginSuccess
      | UserLoginFailure
      | UserLogoutAttempt
      | UserLogoutSuccess
      | UserLogoutFailure
      | GetSessionUser;

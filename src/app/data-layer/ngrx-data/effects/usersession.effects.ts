import { Observable, of } from 'rxjs';
import { map, switchMap, filter, exhaustMap, tap} from 'rxjs/operators';
import { Actions, Effect,ofType } from '@ngrx/effects';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
    UserSessionActionTypes,
    ErrorActionTypes
    } from "@app/business-layer/shared-types/actions";
import {
    UserSessionActions,
    ErrorActions
    } from "@app/data-layer/ngrx-data/actions";
import { UserServices } from '../../api-services';
import {ErrorModel, LoginModel} from "@app/business-layer/models";



@Injectable()
export class UserSessionEffects {

  @Effect()  startAppClearUser$  = of(new UserSessionActions.AppStartLoginClear());


  @Effect() loginUser$ = this.actions$.pipe(
   ofType(UserSessionActionTypes.LOGIN_USER_ATTEMPT),
   map((action:UserSessionActions.UserLoginAttempt) => action.payload),
   switchMap((payload:LoginModel)=> this.userServices.loginUser( payload,
      ErrorActionTypes.REPORT_ERROR,
      UserSessionActionTypes.LOGIN_USER_FAILURE,
      UserSessionActionTypes.LOGIN_USER_SUCCESS))
  );

  @Effect() logoutUser$  = this.actions$.pipe(
   ofType(UserSessionActionTypes.LOGOUT_USER_ATTEMPT),
   exhaustMap( ()=>this.userServices.logoutUser(
    ErrorActionTypes.REPORT_ERROR,
    UserSessionActionTypes.LOGOUT_USER_FAILURE,
    UserSessionActionTypes.LOGOUT_USER_SUCCESS))
  );


  @Effect({ dispatch: false }) logoutUserSuccess$  = this.actions$.pipe(
     ofType(UserSessionActionTypes.LOGOUT_USER_SUCCESS),
     tap(() => this.router.navigateByUrl('/')
     )
  );


 @Effect() removeErrorModleCheckUserFailure$ = this.actions$.pipe(
   ofType(UserSessionActionTypes.LOGIN_USER_FAILURE),
   map((action:UserSessionActions.UserLoginFailure) => action.payload),
   switchMap((payload:ErrorModel) => of(new ErrorActions.RemoveError(payload)))
   );

  constructor(
              private userServices: UserServices,
              private actions$: Actions,
              private router: Router
             ) {  }


}

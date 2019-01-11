import { Observable, of } from 'rxjs';
import { map, switchMap, filter, tap} from 'rxjs/operators';
import { Actions, Effect,ofType } from '@ngrx/effects';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as usersessionActions from '../actions/usersession.actions';
import * as errorActions from '../actions/error.actions';
import { UserServices } from '../../api-services';
import {ErrorModel, LoginModel} from "@app/business-layer/models";



@Injectable()
export class UserSessionEffects {

  @Effect()  startAppClearUser$  = of(new usersessionActions.AppStartLoginClear());


  @Effect() loginUser$ = this.actions$.pipe(
   ofType(usersessionActions.UserSessionTypes.LOGIN_USER_ATTEMPT),
   map((action:usersessionActions.UserLoginAttempt) => action.payload),
   switchMap((payload:LoginModel)=> this.userServices.loginUser( payload,
      errorActions.ErrorTypes.REPORT_ERROR,
      usersessionActions.UserSessionTypes.LOGIN_USER_FAILURE,
      usersessionActions.UserSessionTypes.LOGIN_USER_SUCCESS))
  );

  @Effect() logoutUser$  = this.actions$.pipe(
   ofType(usersessionActions.UserSessionTypes.LOGOUT_USER_ATTEMPT),
   map(action => this.userServices.logoutUser(
    errorActions.ErrorTypes.REPORT_ERROR,
    usersessionActions.UserSessionTypes.LOGOUT_USER_FAILURE,
    usersessionActions.UserSessionTypes.LOGOUT_USER_SUCCESS))
  );


  @Effect() logoutUserSuccess$  = this.actions$.pipe(
    ofType(usersessionActions.UserSessionTypes.LOGOUT_USER_SUCCESS),
    map(action => of(this.router.navigateByUrl('/')))
    );


 @Effect() removeErrorModleCheckUserFailure$ = this.actions$.pipe(
   ofType(usersessionActions.UserSessionTypes.LOGIN_USER_FAILURE),
   map((action:usersessionActions.UserLoginFailure) => action.payload),
   switchMap((payload:ErrorModel) => of(new errorActions.RemoveError(payload)))
   );

  constructor(
              private userServices: UserServices,
              private actions$: Actions,
              private router: Router
             ) {  }


}

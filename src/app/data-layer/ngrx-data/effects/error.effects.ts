import { Observable , of} from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { ErrorModel } from '../../../business-layer/models/error.model';

import * as errorActions from '../actions/error.actions';
import * as profileActions from '../actions/profile.actions';
import * as usersessionActions from '../actions/usersession.actions';



@Injectable()
export class ErrorEffects {


constructor(
    private actions$: Actions,
    private router: Router

) {  }

 @Effect()
  catchAllRemoteError$ = this.actions$.pipe(
   ofType(errorActions.ErrorTypes.REPORT_ERROR),
   map((action:errorActions.ReportError) => action.payload),
   switchMap(payload => {
    let obs;

    switch(payload.action_type) {

     case profileActions.ProfileTypes.CHECK_USER_PROFILE_NAME_FAILURE:
      if(this.router.url.indexOf('register')>0) {
        obs = of( new profileActions.CheckUserProfileNameFailure(<ErrorModel> payload));
      }else {
        obs = of(this.router.navigateByUrl('/error'));
      }
     break;

     case usersessionActions.UserSessionTypes.LOGIN_USER_FAILURE:
       obs = of(new usersessionActions.UserLoginFailure(<ErrorModel> payload));
     break;

     default:{
       obs = of(this.router.navigateByUrl('/error'));
     }


    }
    return obs;
  })
  );




}

import { Observable , of} from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {ErrorModel} from "@app/business-layer/models";
import {
   ErrorActionTypes,
   ProfileActionTypes,
   UserSessionActionTypes
   } from "@app/business-layer/shared-types/actions"

import {
    ErrorActions,
    ProfileActions,
    UserSessionActions
    } from "@app/data-layer/ngrx-data/actions";



@Injectable()
export class ErrorEffects {


constructor(
    private actions$: Actions,
    private router: Router

) {  }

 @Effect()
  catchAllRemoteError$ = this.actions$.pipe(
   ofType(ErrorActionTypes.REPORT_ERROR),
   map((action:ErrorActions.ReportError) => action.payload),
   switchMap(payload => {
    let obs;

    switch(payload.action_type) {

     case ProfileActionTypes.CHECK_USER_PROFILE_NAME_FAILURE:
      if(this.router.url.indexOf('register')>0) {
        obs = of( new ProfileActions.CheckUserProfileNameFailure(<ErrorModel> payload));
      }else {
        obs = of(this.router.navigateByUrl('/error'));
      }
     break;

     case UserSessionActionTypes.LOGIN_USER_FAILURE:
       obs = of(new UserSessionActions.UserLoginFailure(<ErrorModel> payload));
     break;

     default:{
       obs = of(this.router.navigateByUrl('/error'));
     }


    }
    return obs;
  })
  );




}

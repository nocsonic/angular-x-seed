import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom} from 'rxjs/operators';

import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, Effect,ofType } from '@ngrx/effects';

import {
    ProfileActionTypes,
    ErrorActionTypes
    } from "@app/business-layer/shared-types/actions";
import {
    ProfileActions,
    } from "@app/data-layer/ngrx-data/actions";

import { UserServices } from '../../api-services';
import * as fromRoot from '../reducers/index';



@Injectable()
export class ProfileEffects {

 @Effect()
 registerUser$ = this.actions$.pipe(
   ofType(ProfileActionTypes.REGISTER_USER_ATTEMPT),
   map( (action:ProfileActions.UserRegistrationAttempt) => action.payload),
   switchMap(payload =>
    this.userServices.registerUser( payload,
        ErrorActionTypes.REPORT_ERROR,
        ProfileActionTypes.REGISTER_USER_FAILURE,
        ProfileActionTypes.REGISTER_USER_SUCCESS))
  );

 @Effect() getUserByName$ = this.actions$.pipe(
   ofType(ProfileActionTypes.CHECK_USER_PROFILE_NAME_ATTEMPT),
   map((action:ProfileActions.CheckUserProfileNameAttempt) => action.payload),
   switchMap(payload =>
    this.userServices.getUserByName( payload,
        ErrorActionTypes.REPORT_ERROR,
        ProfileActionTypes.CHECK_USER_PROFILE_NAME_FAILURE,
        ProfileActionTypes.CHECK_USER_PROFILE_NAME_SUCCESS)
        )
   );

 @Effect()  getUserProfile$ = this.actions$.pipe(
   ofType( ProfileActionTypes.GET_USER_PROFILE_ATTEMPT ),
   withLatestFrom( this.store.select(fromRoot.getProfileEntities) ),
   map( ([ action, profileEntities]:
     [ ProfileActions.GetUserProfileAttempt, Object]) =>
     [ action.payload , profileEntities ] ),
   switchMap(([username, profileEntities]:[ string , Object ]) => {
    const existsInStore = Object.keys(profileEntities).filter(
                               entity=> {
                                            if(profileEntities[entity].username === username) {
                                              return profileEntities[entity];
                                            }
                                        });
    let obs;
    if(existsInStore && existsInStore.length>0 ) {
      obs =  of( new ProfileActions.SetProfileSelectedId(existsInStore[0]));
    }else {
      obs = this.userServices.getUserByName( username,
                                             ErrorActionTypes.REPORT_ERROR,
                                             ProfileActionTypes.CHECK_USER_PROFILE_NAME_FAILURE,
                                             ProfileActionTypes.GET_USER_PROFILE_SUCCESS );
    }
    return obs;
  })
 );


 constructor( private store:Store<fromRoot.State>,
              private userServices: UserServices,
              private actions$: Actions
             ) {  }
}

import { Observable, of } from 'rxjs';
import { map, switchMap,filter,withLatestFrom, tap} from 'rxjs/operators';

import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, Effect,ofType } from '@ngrx/effects';
import * as errorActions from '../actions/error.actions';
import * as profileActions from '../actions/profile.actions';
import { UserServices } from '../../api-services';
import * as fromRoot from '../reducers/index';
import {UserModel} from "../../../../../../ws-node-demo/src/data-layer/models/UserModel";



@Injectable()
export class ProfileEffects {

 @Effect()
 registerUser$ = this.actions$.pipe(
   ofType(profileActions.ProfileTypes.REGISTER_USER_ATTEMPT),
   map( (action:profileActions.UserRegistrationAttempt) => action.payload),
   switchMap(payload =>
    this.userServices.registerUser( payload,
        errorActions.ErrorTypes.REPORT_ERROR,
        profileActions.ProfileTypes.REGISTER_USER_FAILURE,
        profileActions.ProfileTypes.REGISTER_USER_SUCCESS))
  );

 @Effect() getUserByName$ = this.actions$.pipe(
   ofType(profileActions.ProfileTypes.CHECK_USER_PROFILE_NAME_ATTEMPT),
   map((action:profileActions.CheckUserProfileNameAttempt) => action.payload),
   switchMap(payload =>
    this.userServices.getUserByName( payload,
        errorActions.ErrorTypes.REPORT_ERROR,
        profileActions.ProfileTypes.CHECK_USER_PROFILE_NAME_FAILURE,
        profileActions.ProfileTypes.CHECK_USER_PROFILE_NAME_SUCCESS)
        )
   );

 @Effect()  getUserProfile$ = this.actions$.pipe(
   ofType( profileActions.ProfileTypes.GET_USER_PROFILE_ATTEMPT ),
   withLatestFrom( this.store.select(fromRoot.getProfileEntities) ),
   map( ([ action, profileEntities]:
     [profileActions.GetUserProfileAttempt, profileEntities]) =>
    [ action.payload, profileEntities ] ),
   switchMap(([username, profileEntities]) => {
    const existsInStore = Object.keys(profileEntities).filter(
                               entity=> {
                                            if(profileEntities[entity].username === username) {
                                              return profileEntities[entity];
                                            }
                                        });
    let obs;
    if(existsInStore && existsInStore.length>0 ) {
      obs =  of( new profileActions.SetProfileSelectedId(existsInStore[0]));
    }else {
      obs = this.userServices.getUserByName( username,
                                             errorActions.ErrorTypes.REPORT_ERROR,
                                             profileActions.ProfileTypes.CHECK_USER_PROFILE_NAME_FAILURE,
                                             profileActions.ProfileTypes.GET_USER_PROFILE_SUCCESS );
    }
    return obs;
  })
 );


 constructor( private store:Store<fromRoot.State>,
              private userServices: UserServices,
              private actions$: Actions
             ) {  }
}

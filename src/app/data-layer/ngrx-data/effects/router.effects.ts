
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import {
   RouterActionTypes
  }  from "@app/business-layer/shared-types/actions"
import {
   RouterActions
  } from "@app/data-layer/ngrx-data/actions";

@Injectable({ providedIn: 'root' })
export class RouterEffect {
  @Effect({ dispatch: false })
  public navigate$ = this.actions$.pipe(
    ofType(RouterActionTypes.GO),
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras }).catch();
    })
  );

  @Effect({ dispatch: false })
  public navigateForward$ = this.actions$.pipe(
    ofType(RouterActionTypes.FORWARD),
    tap(() => this.location.forward())
  );

  @Effect({ dispatch: false })
  public navigateBack$ = this.actions$.pipe(
    ofType(RouterActionTypes.BACK),
    tap(() => this.location.back())
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}


import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {  CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

import { take } from 'rxjs/operators';

import * as layoutActions from '../actions/layout.actions';
import * as fromRoot from '../reducers/index';

@Injectable()
export class DialogStateGuard implements CanActivate {

    constructor( private store: Store<fromRoot.State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        this.store.select(fromRoot.getShowLoginDialog).pipe(take(1)).subscribe( (dialogOpen) => {
                if(dialogOpen) {
                    this.store.dispatch(new layoutActions.HideLoginDialog());
                }
        });

        return true;
    }
}

import { ActionReducerMap } from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import {
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';
import {createSelector} from '@ngrx/store';
import { getRouterState } from  "@app/data-layer/ngrx-data/reducers";

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
export const getQueryParams = createSelector(
  getRouterState,
  (routeState: any) =>
    routeState && routeState.state ? routeState.state.queryParams : null
);

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

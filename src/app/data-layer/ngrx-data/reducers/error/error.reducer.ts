import { createSelector } from 'reselect';
import { ErrorModel } from "@app/business-layer/models";
import {
    ErrorActionTypes
    } from "@app/business-layer/shared-types/actions";
import {
    ErrorActions
    } from "@app/data-layer/ngrx-data/actions";

export  interface State {
  ids: string[];
  entities: { [id: string]: ErrorModel };
}


export const initialState: State = {
  ids: [],
  entities: {}
};




export function reducer(state = initialState, action: ErrorActions.Actions): State {
  switch (action.type) {
    case ErrorActionTypes.REPORT_ERROR: {
          let errorObj = Object.assign({},action.payload, {id:(Date.now()).toString()});
          const error:ErrorModel = <ErrorModel>action.payload;

          return {
            ids: [ ...state.ids, error.id ],
            entities: Object.assign({}, state.entities, { [error.id]: error  })
          };
    }
    case ErrorActionTypes.REMOVE_ERROR: {
          const errorId:string = <string>action.payload.message;

          if (state.ids.indexOf(errorId) > -1) {
             return state;
          }

          const errorIdsPostRemoval =  state.ids.filter(id => id !== errorId);

          let errorEntities =  Object.assign({}, state.entities);
          delete errorEntities[errorId];

          return  Object.assign({}, state,{
             ids: errorIdsPostRemoval,
             entities: errorEntities
          });
    }

    default: {
      return state;
    }
  }

}




export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Config } from '../../shared-utils/app-env/env.config';
import { HttpParams } from './interfaces/httpParams.model';

@Injectable()
export class HttpWrapperService {
  /*
    These are the methods that are used in the additional api-services,
    where otherwise they would require importing angular 2 http module.
    This keeps the api-services DRY, easier to test, and scalable.
  */

  constructor(private http: HttpClient) { }


  public delete(params: HttpParams) {
    let {apiUrl, headerOptions} = this.configRequest(params.uri, true);

    return this.http.delete(apiUrl, headerOptions).pipe(
      map(res => ({
        type: params.successActionType,
        payload: res[params.responseObject]
      })),
      catchError(res =>{
        return of({
              type: params.errorActionType,
              payload: {
                action_type: params.specificErrorType,
                message: res.error
              }
            })
      })
    )
  }

  public get(params: HttpParams) {
    let {apiUrl, headerOptions} = this.configRequest(params.uri, params.auth);
    return this.http.get(apiUrl, headerOptions).pipe(
      map(res => ({
        type: params.successActionType,
        payload: res[params.responseObject]
      })),
      catchError(res =>{
        return of({
              type: params.errorActionType,
              payload: {
                action_type: params.specificErrorType,
                message: res.error
              }
            })
      })
    )
  }

  public post(params: HttpParams) {

    let {apiUrl, headerOptions} = this.configRequest(params.uri, params.auth);
    return this.http.post(apiUrl, params.payload, headerOptions).pipe(
      map(res => ({
        type: params.successActionType,
        payload: res[params.responseObject]
      })),
      catchError(res =>{
        return of({
              type: params.errorActionType,
              payload: {
                action_type: params.specificErrorType,
                message: res.error
              }
            })
      })
    )
  }

  public put(params: HttpParams) {
    let {apiUrl, headerOptions} = this.configRequest(params.uri, true);

    return this.http.put(apiUrl, params.payload, headerOptions).pipe(
      map(res => ({
        type: params.successActionType,
        payload: res[params.responseObject]
      })),
      catchError(res =>{
        return of({
              type: params.errorActionType,
              payload: {
                action_type: params.specificErrorType,
                message: res.error
              }
            })
      })
    )
  }



  private configRequest(uri: string, authRequired: boolean = false): {apiUrl: string, headerOptions:any} {
    let apiUrl = `${Config.HOST}:${Config.PORT}/${Config.API}/${uri}`;
    let headerOptions = { header: authRequired ?
        new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token' : `${localStorage['Authorized']}`
      }) :
      new  HttpHeaders({'Content-Type': 'application/json'})
      };


    return {apiUrl, headerOptions};
  }

}

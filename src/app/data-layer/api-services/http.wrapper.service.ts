import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Config } from '../../shared-utils/app-env/env.config';
import { HttpParams } from './interfaces/httpParams.model';

@Injectable()
export class HttpWrapperService {
  /*
    These are the methods that are used in the additional api-services,
    where otherwise they would require importing angular 2 http module.
    This keeps the api-services DRY, easier to test, and scalable.
  */

  constructor(private http: Http) { }


  public delete(params: HttpParams) {
    let {apiUrl, options} = this.configRequest(params.uri, true);

    return this.http.delete(apiUrl, options).pipe(
      map(res => ({
        type: params.successActionType,
        payload: res[params.responseObject]
      }))
      .catch(res =>({
        type: params.errorActionType,
        payload: {
          action_type: params.specificErrorType,
          message: res.error
        }
      })
      ));
  }

  public get(params: HttpParams) {
    let {apiUrl, options} = this.configRequest(params.uri, params.auth);
    return this.http.get(apiUrl, options).pipe(
      map(res => ({
        type: params.successActionType,
        payload: res[params.responseObject]
      }))
      .catch(res =({
        type: params.errorActionType,
        payload: {
          action_type: params.specificErrorType,
          message: res
        }
      })
      ));
  }

  public post(params: HttpParams) {

    let {apiUrl, options} = this.configRequest(params.uri, params.auth);
    return this.http.post(apiUrl, params.payload, options).pipe(
      map(res => ({
        type: params.successActionType,
        payload: res.json()[params.responseObject]
      }))
      .catch(res =>({
        type: params.errorActionType,
        payload: {
          action_type: params.specificErrorType,
          message: res.error
        }
      })
      ));
  }

  public put(params: HttpParams) {
    let {apiUrl, options} = this.configRequest(params.uri, true);

    return this.http.put(apiUrl, params.payload, options).pipe(
      map(res => ({
        type: params.successActionType,
        payload: res.json()[params.responseObject]
      }))
      .catch(res => ({
        type: params.errorActionType,
        payload: {
          action_type: params.specificErrorType,
          message: res.json().error
        }
      })
      ));
  }



  private configRequest(uri: string, authRequired: boolean = false): {apiUrl: string, options: RequestOptions} {
    let apiUrl = `${Config.HOST}/${Config.API}/${uri}`;

    let headers = authRequired ?
      new Headers({
        'Content-Type': 'application/json',
        'x-access-token' : `${localStorage['Authorized']}`
      }) :
      new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return {apiUrl, options};
  }

}

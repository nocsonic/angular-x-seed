/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */




import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

import { AppStageModule } from './app-stage/app.stage.module';
import { environment } from '../environments/environment'

if (environment.envName === 'PROD') {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppStageModule)
  // tslint:disable-next-line:no-console
  .catch(err => console.log(err));

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */

import { enableProdMode } from '@angular/core';
// The browser platform with a compiler
import { environment } from '../environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


// The app module
import { AppStageModule } from './app-stage/app.stage.module';


platformBrowserDynamic().bootstrapModule(AppStageModule/*, options*/)
  .catch(err => console.log(err));

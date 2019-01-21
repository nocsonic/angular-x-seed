
import {enableProdMode, NgModule} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

import { AppStageModule } from './app-stage/app.stage.module';
import { environment } from '../environments/environment'

import { hmrBootstrap } from './../dev-utils/hmr';

if (environment.envName === 'PROD') {
  enableProdMode();
}
platformBrowserDynamic()
  .bootstrapModule(AppStageModule)
  // tslint:disable-next-line:no-console
  .catch(err => console.log(err));

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppStageModule);

if (environment.hmr) {
  if (module[ 'hot' ]) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch(err => console.log(err));
}


import { ModuleWithProviders,  NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpWrapperService } from '../api-services';
import { UserServices } from '../api-services/user.service';

/*
     ngrx base library
 */
import { StoreRouterConnectingModule, routerReducer  } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from  './reducers/index';


/*
     effects
 */


import { ErrorEffects } from './effects/error.effects';
import { UserSessionEffects } from './effects/usersession.effects';
import { ProfileEffects } from './effects/profile.effects';

/*
   Routes and Guards
 */
import { UsersessionGuard, DialogStateGuard } from './guards/index';

@NgModule({
    imports:  [ CommonModule,
               RouterModule,
               StoreModule.forRoot({
                                  router:reducers.router
               }),
               StoreRouterConnectingModule.forRoot(),
               EffectsModule.forRoot([
                 ErrorEffects,
                 ProfileEffects,
                 UserSessionEffects
                 ]),
               ],
    providers: [ UsersessionGuard,
                 DialogStateGuard,
                 HttpWrapperService,
                 UserServices  ]
})
export class NGRxDataModule {

  constructor(@Optional() @SkipSelf() parentModule: NGRxDataModule) {
    if (parentModule) {
      throw new Error('NGRxDataModule already loaded; Import in root module only.');
    }
  }
  static forRoot(): ModuleWithProviders  {
    return {
      ngModule: NGRxDataModule,
      providers: [ UsersessionGuard,
                   DialogStateGuard,
                   HttpWrapperService,
                   UserServices]
    }
  }
}

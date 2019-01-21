import { NgModule, } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

//data layer
import { NGRxDataModule } from '../data-layer/ngrx-data/ngrx.data.module';

import { NGRxBrokerRegistrationService } from '../business-layer/brokerage/registries/ngrx.broker.registration.service';

//business layer ngrx pubsub-broker brokerage
import { BrokerageModule }   from '../business-layer/brokerage/brokerage.module';
// handle request from viewlayer to the store by way of a brokerage
import { PubSubBrokerModule }   from '../business-layer/pubsub-broker/pubsub.broker.module';


/*
  Page views
 */
import { HomeModule }  from '../view-layer/modules-by-route/home/home.module';
import { NotfoundPageModule }  from '../view-layer/modules-by-route/notfound/notfound.page.module';
import { MastheadModule } from '../view-layer/common-views/masthead/masthead.module';


/*
     Smart Container (components that reference ngrx Store)
 */
import { AppStageComponent } from './app.stage.component';
import { AppStageRoutingModule } from './app.stage.routing.module';



@NgModule({
  imports: [
             CommonModule,
             BrowserModule,
             BrowserAnimationsModule,
             HttpClientModule,
             NGRxDataModule.forRoot(),
             PubSubBrokerModule.forRoot(),
             BrokerageModule.forRoot(),
             AppStageRoutingModule,
             MastheadModule,
             HomeModule,
             NotfoundPageModule,
             FlexLayoutModule
           ],
  providers: [
    NGRxBrokerRegistrationService
    ],
  bootstrap: [ AppStageComponent ],
  declarations: [ AppStageComponent ],

})

export class AppStageModule {
    constructor(private ngrxBRS:NGRxBrokerRegistrationService){}
}

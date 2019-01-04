import {NgModule} from '@angular/core';

import {HighchartsComponent} from './highcharts.component';
import {HighchartsRoutingModule} from './highcharts-routing.module';

import {HighchartsChartModule} from 'highcharts-angular';
import {StoreModule} from '@ngrx/store';
import {HIGHCHARTS_STATE, reducers} from './reducers';
import {ChartComponent} from './components/chart/chart.component';
import {EffectsModule} from '@ngrx/effects';
import {ChartEffects} from './effects/chart.effects';
import {SharedModule} from '@shared/shared.module';

@NgModule({
    imports: [
        HighchartsRoutingModule,
        StoreModule.forFeature(HIGHCHARTS_STATE, reducers),
        EffectsModule.forFeature([ChartEffects]),
        SharedModule,
        HighchartsChartModule
    ],
    declarations: [
        HighchartsComponent,
        ChartComponent
    ]
})
export class HighchartsModule {
}

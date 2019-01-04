declare var require: any;

import * as Highcharts from 'highcharts/highstock';
import {ChartObject} from 'highcharts/highstock';
import {PointObject, SeriesObject, SeriesOptions} from 'highcharts';

require('highcharts/modules/boost')(Highcharts);

import {Store, select} from '@ngrx/store';
import * as fromChartSelectors from '@highcharts/selectors/chart.selector';
import * as fromChartActions from '@highcharts/actions/chart.action';
import * as fromHighcharts from '@highcharts/reducers';

import {Observable} from 'rxjs/internal/Observable';
import {Subscription} from 'rxjs/internal/Subscription';

import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';

import * as _ from 'lodash';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnDestroy {
    Highcharts;
    chartOptions: Highcharts.Options;
    chartConstructor: string;
    chart: ChartObject;
    pointXValue: Observable<number>;
    lastChartXValueMouseOverSuscription: Subscription;

    constructor(private highchartsStore: Store<fromHighcharts.State>) {
        this.pointXValue = highchartsStore.pipe(select(fromChartSelectors.selectPointXValue));
    }

    ngOnInit() {
        this.initChartOptions();
        this.pointXValue.subscribe((pointXValue: number) => {
            if (!_.isNull(pointXValue)) {
                this.mouseOverToPointThatHasTheSameXValue(pointXValue);
            }
        });
    }

    callbackFunction = (chart) => this.chart = chart;

    ngOnDestroy(): void {
        this.lastChartXValueMouseOverSuscription.unsubscribe();
    }

    private initChartOptions() {
        // Needed in order to create an instance of Highchart
        this.Highcharts = Highcharts;

        this.chartConstructor = 'stockChart';

        this.chartOptions = {
            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },
            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },
            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: this.getSeries(),
            plotOptions: {
                series: {
                    point: {
                        events: {
                            mouseOver: _.debounce(
                                (event: any) => this.dispatchPointMouseOverAction(event),
                                500
                            )
                        }
                    }
                }
            },
        };

        (<any>this.chartOptions).boost = {
            useGPUTranslations: true
        };
    }

    private dispatchPointMouseOverAction(event: any) {
        this.highchartsStore.dispatch(new fromChartActions.PointMouseOver(event));
    }

    private getSeries(): Array<SeriesOptions> {
        const result: Array<SeriesOptions> = [];
        ['Installation', 'Manufacturing', 'Sales & Distribution', 'Project Development', 'Other'].forEach(seriesName => {
            result.push({
                name: seriesName,
                data: this.getSeriesData(50)
            });
        });

        return result;
    }

    private getSeriesData(num: number): Array<[number, number]> {
        const seriesData: Array<[number, number]> = [];

        for (let i = 0; i < num; i++) {
            seriesData.push([i, Math.random()]);
        }

        return seriesData;
    }

    private mouseOverToPointThatHasTheSameXValue(pointXValue: number): void {
        // We need only the first series visible because once we trigger
        // the mouse over event of one of its point, automatically all points in the
        // in the same position will be highlighted.
        const firstSeriesVisible = this.getTheFirstSeriesVisible();

        if (!_.isUndefined(firstSeriesVisible)) {
            firstSeriesVisible.data.forEach((point: PointObject) => {
                if (point.x === pointXValue) {
                    (<any>point).onMouseOver();
                    return;
                }
            });
        }
    }

    private getTheFirstSeriesVisible(): SeriesObject | undefined {
        if (this.chart) {
            return this.chart.series.find(series => series.visible);
        }
        return undefined;
    }
}

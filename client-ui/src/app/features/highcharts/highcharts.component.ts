import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighchartsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

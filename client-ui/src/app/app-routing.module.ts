import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'highcharts',
    loadChildren: './features/highcharts/highcharts.module#HighchartsModule'
  },
  {
    path: '',
    redirectTo: 'highcharts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

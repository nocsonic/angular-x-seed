import {NgModule} from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';
import {CdkTableModule} from '@angular/cdk/table';
import {
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders} from '@angular/core';
import {Type} from '@angular/core';

const modules: ModuleWithProviders[] | Array<Type<any> | any[]> = [
    CommonModule,
    LayoutModule,
    CdkTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule
];

@NgModule({
    imports: modules,
    exports: modules,
    declarations: []
})
export class SharedModule {
}

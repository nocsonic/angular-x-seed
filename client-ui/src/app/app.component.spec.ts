import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NavbarComponent} from '@app/components/navbar/navbar.component';
import {SidenavComponent} from '@app/components/sidenav/sidenav.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import * as fromRoot from '@app/store/reducers';

describe('AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let sidenavHTMLElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(fromRoot.reducers),
            ],
            declarations: [
                AppComponent,
                NavbarComponent,
                SidenavComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        sidenavHTMLElement = fixture.nativeElement.querySelector('app-sidenav');
    }));

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should have the sidenav', () => {
        expect(sidenavHTMLElement).toBeTruthy();
    });

    it('should have the navbar within sidebar', () => {
        const navbarComponent: HTMLElement = sidenavHTMLElement.querySelector('app-navbar');
        expect(navbarComponent).toBeTruthy();
    });

    it ('should have the router-outlet within sidebar', () => {
        const routerOutlet: HTMLElement = sidenavHTMLElement.querySelector('router-outlet');
        expect(routerOutlet).toBeTruthy();
    });
});

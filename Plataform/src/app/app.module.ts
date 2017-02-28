import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { CommonModule, LocationStrategy,
         HashLocationStrategy/*, PathLocationStrategy*/ }         from '@angular/common';
import { FormsModule }                  from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent }                 from './app.component';
import { Ng2BootstrapModule }           from 'ng2-bootstrap/ng2-bootstrap';
import { NAV_DROPDOWN_DIRECTIVES }      from './shared/nav-dropdown.directive';

import { ChartsModule }                 from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES }    from './shared/sidebar.directive';
import { AsideToggleDirective }         from './shared/aside.directive';
import { BreadcrumbsComponent }         from './shared/breadcrumb.component';

import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';

// Routing Module
import { AppRoutingModule }             from './app.routing';

import { UnauthorizedModule } from './unauthorized/unauthorized.module';
import { ProtectedModule } from './protected/protected.module';

// Layouts
import { FullLayoutComponent }          from './layouts/full-layout.component';

export const firebaseConfig = {
    apiKey: "AIzaSyCWjs-R7KWD1Hqg1Ve4h1ZGynj06XbB-JQ",
    authDomain: "avcproject-fae11.firebaseapp.com",
    databaseURL: "https://avcproject-fae11.firebaseio.com",
    storageBucket: "avcproject-fae11.appspot.com",
    messagingSenderId: "1031859806052"
};

@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        Ng2BootstrapModule,
        ChartsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        MaterialModule,

        ProtectedModule,
        UnauthorizedModule
    ],
    declarations: [
        AppComponent,
        FullLayoutComponent,
        NAV_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy // This strategy with base-href './' allow to move the app to any subsite and works
            // useClass: PathLocationStrategy // Only if passed the --base-href argument at build & the server has url rewrite to index.html
        },
        AuthService,
        AuthGuardService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

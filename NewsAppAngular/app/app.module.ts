import { NgModule } from '@angular/core';
import { APP_BASE_HREF, Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { NavComponent } from './components/nav.component';
import { NewsComponent } from './components/news.component';
import { UserComponent } from './components/user.component';
import { ProfileComponent } from './components/profile.component';

import { routing, appRoutingProviders } from './app.routing';

@NgModule({
    imports: [BrowserModule, routing, FormsModule, HttpModule, NgbModule.forRoot(), SlimLoadingBarModule.forRoot()],
    declarations: [AppComponent, HomeComponent, NavComponent, NewsComponent, UserComponent, ProfileComponent],
    providers: [
        Location,        
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent, NavComponent]
})
export class AppModule { }

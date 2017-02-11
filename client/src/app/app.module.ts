import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
import {Configuration} from './app.constants'

import {AuthGuard} from './guards/index';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {ThingsComponent} from './components/things/things.component';

import {ThingService} from './services/thing.service'
import {AuthenticationService} from './services/authentication.service'
import {LogoutComponent} from "./components/logout/logout.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GeneralConsumptionComponent } from './components/general-consumption/general-consumption.component';

import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '@angular/material';
import { ConsumptionCardComponent } from './components/consumption-card/consumption-card.component';
import { ConsumptionTextComponent } from './components/consumption-text/consumption-text.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ThingsComponent,
    LogoutComponent,
    DashboardComponent,
    GeneralConsumptionComponent,
    ConsumptionCardComponent,
    ConsumptionTextComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ChartsModule
  ],
  providers: [
    appRoutingProviders,
    Configuration,
    AuthenticationService,
    AuthGuard,
    ThingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

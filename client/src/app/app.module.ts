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
import {LogoutComponent} from "./components/logout/logout.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GeneralConsumptionComponent } from './components/general-consumption/general-consumption.component';

import {ThingService} from './services/thing.service';
import {AuthenticationService} from './services/authentication.service';
import {TransactionService} from './services/transaction.service';


import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '@angular/material';

import { ConsumptionCardComponent } from './components/consumption-card/consumption-card.component';
import { ConsumptionTextComponent } from './components/consumption-text/consumption-text.component';
import { ConsumptionDetailsComponent } from './components/consumption-details/consumption-details.component';
import { ConsumptionGreenComponent } from './components/consumption-green/consumption-green.component';
import { ConsumptionGreyComponent } from './components/consumption-grey/consumption-grey.component';
import { OverviewCardComponent } from './components/overview-card/overview-card.component';
import { LastMonthDetailsComponent } from './components/last-month-details/last-month-details.component';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { SourcesMapComponent } from './components/sources-map/sources-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ThingsComponent,
    LogoutComponent,
    DashboardComponent,
    GeneralConsumptionComponent,
    ConsumptionCardComponent,
    ConsumptionTextComponent,
    ConsumptionDetailsComponent,
    LastMonthDetailsComponent,
    ConsumptionDetailsComponent,
    ConsumptionGreenComponent,
    ConsumptionGreyComponent,
    OverviewCardComponent,
    SourcesMapComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBVOVi33dg84fegdpXRABniFqnIO3FzUfI'
    }),
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
    ThingService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

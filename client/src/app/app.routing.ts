import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/index';
import {LoginComponent} from './components/login/login.component'
import {ThingsComponent} from './components/things/things.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {ConsumptionCardComponent} from './components/consumption-card/consumption-card.component'
import {OverviewCardComponent} from './components/overview-card/overview-card.component'


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'things', component: ThingsComponent, canActivate: [AuthGuard]},
  {path: 'consumption', component: ConsumptionCardComponent},
  {path: 'overview', component: OverviewCardComponent},
  {path: '', component: DashboardComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

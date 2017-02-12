import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/index';
import {LoginComponent} from './components/login/login.component'
import {ThingsComponent} from './components/things/things.component'
import {TransactionsComponent} from './components/transactions/transactions.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {ConsumptionCardComponent} from './components/consumption-card/consumption-card.component'
import {OverviewCardComponent} from './components/overview-card/overview-card.component'
import {ActionCardComponent} from './components/action-card/action-card.component'

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'things', component: ThingsComponent, canActivate: [AuthGuard]},
  {path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard]},
  {path: 'consumption', component: ConsumptionCardComponent},
  {path: 'overview', component: OverviewCardComponent},
  {path: 'action', component: ActionCardComponent},
  {path: '', component: DashboardComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

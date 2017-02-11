import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Configuration} from '../app.constants';
import {AuthenticationService} from './authentication.service'

@Injectable()
export class TransactionService {
  private actionUrl: string;
  private headers: any;

  constructor(private _http: Http,
              private _configuration: Configuration,
              private _authenticationService: AuthenticationService){
    this.actionUrl = _configuration.Server + 'api/v1/transactions';
    this.headers = _authenticationService.createAuthorizationHeader();
  }

  public getAllTransactions() {
    return this._http
      .get(this.actionUrl + '/', {headers: this.headers})
      .map(res => res.json());
  }

  public getAllTransactionsByTimeframe(startTime: number, endTime: number) {
    return this._http
      .get(this.actionUrl + '/' + startTime + '/' + endTime, {headers: this.headers})
      .map(res => res.json());
  }
}

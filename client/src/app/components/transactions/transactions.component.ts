import { Component, OnInit } from '@angular/core';
import { TransactionService }  from '../../services/transaction.service'
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  providers: [TransactionService]
})
export class TransactionsComponent implements OnInit {
  public rows:string[] = ["A", "B", "C"];
  public transactions:Observable<any>;
  public transactionArray:any[] = [];
  constructor(private _transactionService: TransactionService) { }

  ngOnInit() {
    this.getTransactions();
    setInterval(() => { this.getTransactions();}, 5000);
  }

  private getTransactions(): void {
    this.transactions = this._transactionService.getTransactions();
    this.transactions.subscribe(event => {
      console.log(event);
      event.forEach(item => this.transactionArray.push(item));
    });
  }

}

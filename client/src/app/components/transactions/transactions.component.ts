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
  private rows:string[] = ["A", "B", "C"];
  private transactions:Observable<any>;
  private transactionArray:any[] = [];

  constructor(private _transactionService: TransactionService) { }

  ngOnInit() {
    this.getTransactions();
    setInterval(() => { this.getTransactions();}, 5000);
  }

  private getTransactions(): void {
    this._transactionService.getTransactions().subscribe(txs => {
      this.transactions = txs;
      console.log(this.transactions)
    });
  }

}

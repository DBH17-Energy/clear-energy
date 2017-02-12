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
  private loading:string = "Loading..."

  constructor(private _transactionService: TransactionService) { }

  ngOnInit() {
    this.getTransactions();
  }

  private getTransactions(): void {
    this._transactionService.getTransactions().subscribe(txs => {
      this.loading = "";
      this.transactions = txs;
      console.log(this.transactions)
      setInterval(() => { this.getTransactions();}, 5000);
    });
  }

}

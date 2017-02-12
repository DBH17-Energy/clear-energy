import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-consumption-text',
  templateUrl: './consumption-text.component.html',
  styleUrls: ['./consumption-text.component.css']
})
export class ConsumptionTextComponent implements OnInit {

  private totalAmount: number;
  private month: string = "February";
  private startTime: number = 1485903600000;
  private endTime: number = new Date().getTime();

  constructor(private _transactionService: TransactionService) { }

  ngOnInit() {
    this.calculateUsage();
    setInterval(() => { this.calculateUsage();}, 5000);
  }

  private calculateUsage(): void {
    this._transactionService.getTransactionsByTimeframe(this.startTime, this.endTime).subscribe(txs => {
      this.totalAmount = txs.map(x => x.eunit).reduce((a, b) => a +b) * 0.3;
    });
  }

}

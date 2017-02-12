import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-general-consumption',
  templateUrl: './general-consumption.component.html',
  styleUrls: ['./general-consumption.component.css']
})
export class GeneralConsumptionComponent implements OnInit {
  // Doughnut
  private doughnutChartLabels:string[] = ['Green', 'Grey'];
  private doughnutChartData:number[] = [70, 30];
  private doughnutChartType:string = 'doughnut';
  private backgroundColor:any = [{backgroundColor: ["#33dabd", "#9575cd"]}];
  private startTime:number;
  private endTime:number;
  private transactions:any[];
  private totalGreyAmount:number;
  private totalGreenAmount:number;

  constructor(private _transactionService: TransactionService) {
    this.startTime = 1485903600000;
    this.endTime = new Date().getTime();
    this.totalGreyAmount = 0;
    this.totalGreenAmount = 0;
  }

  ngOnInit() {
    var storage = JSON.parse(localStorage.getItem('currentUser'));
    if (storage !== null) {
      this.getTransactionsByTimeframe();
      setInterval(() => {
        this.getTransactionsByTimeframe();
      }, 5000);
    }
  }

  private getTransactionsByTimeframe(): void {
      this._transactionService.getTransactionsByTimeframe(this.startTime, this.endTime).subscribe(txs => {

      this.transactions = txs;
      console.log(this.transactions);
      this.totalGreenAmount = this.calculateGreenAmount(this.transactions);
      this.totalGreyAmount = this.calculateGrayAmount(this.transactions);
      console.log('Total Green Amount: ',this.totalGreenAmount);
      console.log('Total Grey Amount: ',this.totalGreyAmount);
      this.doughnutChartData = [this.totalGreenAmount, this.totalGreyAmount];
    });
  }

  private chartClicked(e:any):void {

  }

  private chartHovered(e:any):void {

  }

  private calculateGreenAmount(transactions):number {
      return transactions.filter(x => x.etype == 'green')
        .map(x => x.eunit)
        .reduce((a, b) => a +b);
  }
  private calculateGrayAmount(transactions):number {
    return transactions.filter(x => x.etype == 'grey')
      .map(x => x.eunit)
      .reduce((a, b) => a +b);
  }

}

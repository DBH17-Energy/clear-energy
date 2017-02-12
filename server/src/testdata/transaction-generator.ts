'use strict';

import {Transaction} from '../entities/transaction.model';
import {BlockchainClient} from '../blockchain/client/blockchainClient';
import {LoggerInstance} from 'winston';
import {User} from '../entities/user.model';

export class TransactionGenerator {
    private usersArray: Array<User> = [];

    public constructor(private blockchainClient: BlockchainClient, private logger: LoggerInstance) {
        this.usersArray = this.generateUsersArray();
    }

    public submitRandomTransactions(): void {
        setInterval(() => { this.recordRandomTransaction(); }, 1000);
    }

    private recordRandomTransaction(): void {
        let transaction: Transaction = this.generateRandomTransaction();
        let enrollmentID = 'WebAppAdmin';
        this.blockchainClient.invoke('addTransaction', [JSON.stringify(transaction)], enrollmentID).then((result: any) => {
          this.logger.info('[RandomTransaction] Added RandomTransaction');
        }).catch((err: any) => {
          this.logger.error(err);
        });
    }

    private generateRandomTransaction(): Transaction  {
        let timestamp = new Date().getTime();
        let eunit = this.generateRandomInt(0.5, 10.0);

        let transaction = new Transaction({
            timestamp: timestamp,
            id: 't' + timestamp,
            sender: this.getSupplier(),
            receiver: this.getRandomUser(),
            eunit: eunit,
            device: null,
            etype: Math.random() >= 0.6 ? 'grey' : 'green',
            co2: this.generateRandomInt(eunit, 10.0),
            transactionType: 'sell', });

        return transaction;
    }

    private generateUsersArray(): Array<User> {
        let usersArray: Array<User> = [];

        usersArray.push(new User('luna', 'passw0rd', 'luna'));
        usersArray.push(new User('gary', 'passw0rd', 'gary'));

        return usersArray;
    }

    private getRandomUser(): User {
        return this.usersArray[this.generateRandomInt(0 , 1)];
    }

    private generateRandomInt(min: number, max: number): number {
        let range: number = Math.abs(max - min);
        let x: number = Math.random();

        return Math.round((x * range) + Math.min(max , min));
    }

    // private generateRandomFloat(min: number, max: number): number {
    //     let range: number = Math.abs(max - min);
    //     let x: number = Math.random();
    //
    //     return (x * range) + Math.min(max , min);
    // }

    private getSupplier(): User {
        return new User('charlotte', 'passw0rd', 'charlotte');
    }

}
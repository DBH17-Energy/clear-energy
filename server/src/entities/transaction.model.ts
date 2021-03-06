'use strict';
import {User} from './user.model';
import {Device} from './device.model';

export class Transaction {
    private _id: string;
    private _sender: User;
    private _receiver: User;
    private _eunit: number;
    private _device: Device;
    private _etype: string;
    private _co2: number;
    private _timestamp: number;
    private _transactionType: string;

    public constructor(transaction: any) {
        this._id = transaction.id;
        this._sender = transaction.sender;
        this._receiver = transaction.receiver;
        this._eunit = transaction.eunit;
        this._device = transaction.device;
        this._etype = transaction.etype;
        this._co2 = transaction.co2;
        this._timestamp = transaction.timestamp;
        this._transactionType = transaction.transactionType;
    }

    public get id(): string {
        return this._id;
    }

    public get sender(): User {
        return this._sender;
    }

    public get receiver(): User {
        return this._receiver;
    }

    public get eunit(): number {
        return this._eunit;
    }

    public get device(): Device {
        return this._device;
    }

    public get etype(): string {
        return this._etype;
    }

    public get co2(): number {
        return this._co2;
    }

    public get timestamp(): number {
        return this._timestamp;
    }

    public get transactionType(): string {
        return this._transactionType;
    }

    public toJSON(): any {
        return {
            'id': this.id,
            'sender': this.sender,
            'receiver': this.receiver,
            'eunit': this.eunit,
            'device': this.device,
            'etype': this.etype,
            'co2': this.co2,
            'timestamp': this.timestamp,
            'transactionType': this.transactionType,
        };
    }
}
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

    public constructor(id: string, sender: User, receiver: User, eunit: number, device: Device, etype: string, co2: number, timestamp: number, transactionType: string) {
        this._id = id;
        this._sender = sender;
        this._receiver = receiver;
        this._eunit = eunit;
        this._device = device;
        this._etype = etype;
        this._co2 = co2;
        this._timestamp = timestamp;
        this._transactionType = transactionType;
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
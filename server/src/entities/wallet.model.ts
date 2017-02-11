'use strict';
import {User} from "./user.model";
import {Device} from "./device.model";

export class Wallet {
    private _id: string;
    private _owner: User;
    private _totalEunit: number;
    private _totalCo2: number;

    constructor(id: string, owner: User, totalEunit: number, totalCo2: number) {
        this._id = id;
        this._owner = owner;
        this._totalEunit = totalEunit;
        this._totalCo2 = totalCo2;
    }

    public get id(): string {
        return this._id;
    }

    public get owner(): User {
        return this._owner;
    }

    public get totalEunit(): number {
        return this._totalEunit;
    }

    public get totalCo2(): number {
        return this._totalCo2;
    }

    public toJSON(): any {
        return {
            'id': this.id,
            'owner': this.owner,
            'totalEunit': this.totalEunit,
            'totalCo2': this.totalCo2,
        };
    }
}
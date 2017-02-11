'use strict';
import {User} from "./user.model";

export class Device {
    private _id: string;
    private _deviceType: string;
    private _energyType: string;
    private _co2PerEUnit: number;
    private _owner: User;
    private _locationX: number;
    private _locationY: number;
    private _totalEunit: number;
    private _totalCo2: number;

    public constructor(id: string, deviceType: string, energyType: string, co2PerEUnit: number, owner: User, locationX: number, locationY: number, totalEunit: number, totalCo2: number) {
        this._id = id;
        this._deviceType = deviceType;
        this._energyType = energyType;
        this._co2PerEUnit = co2PerEUnit;
        this._owner = owner;
        this._locationX = locationX;
        this._locationY = locationY;
        this._totalEunit = totalEunit;
        this._totalCo2 = totalCo2;
    }

    public get id(): string {
        return this._id;
    }

    public get deviceType(): string {
        return this._deviceType;
    }

    public get energyType(): string {
        return this._energyType;
    }

    public get co2PerEUnit(): number {
        return this._co2PerEUnit;
    }

    public get owner(): User {
        return this._owner;
    }

    public get locationX(): number {
        return this._locationX;
    }

    public get locationY(): number {
        return this._locationY;
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
            'deviceType': this.deviceType,
            'energyType': this.energyType,
            'co2PerEUnit': this.co2PerEUnit,
            'owner': this.owner,
            'locationX': this.locationX,
            'locationY': this.locationY,
            'totalEunit': this.totalEunit,
            'totalCo2': this.totalCo2,
        };
    }
}
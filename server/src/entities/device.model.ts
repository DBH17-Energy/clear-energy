'use strict';
import {User} from './user.model';

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

    public constructor(device: any) {
        this._id = device.id;
        this._deviceType = device.deviceType;
        this._energyType = device.energyType;
        this._co2PerEUnit = device.co2PerEUnit;
        this._owner = device.owner;
        this._locationX = device.locationX;
        this._locationY = device.locationY;
        this._totalEunit = device.totalEunit;
        this._totalCo2 = device.totalCo2;
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
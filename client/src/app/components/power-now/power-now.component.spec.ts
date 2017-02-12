/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PowerNowComponent } from './power-now.component';

describe('PowerNowComponent', () => {
  let component: PowerNowComponent;
  let fixture: ComponentFixture<PowerNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

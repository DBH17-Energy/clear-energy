/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PowerNowActionComponent } from './power-now-action.component';

describe('PowerNowActionComponent', () => {
  let component: PowerNowActionComponent;
  let fixture: ComponentFixture<PowerNowActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerNowActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerNowActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

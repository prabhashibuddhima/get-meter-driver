import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRatePage } from './customer-rate.page';

describe('CustomerRatePage', () => {
  let component: CustomerRatePage;
  let fixture: ComponentFixture<CustomerRatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

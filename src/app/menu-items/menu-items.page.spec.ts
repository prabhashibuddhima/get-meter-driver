import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsPage } from './menu-items.page';

describe('MenuItemsPage', () => {
  let component: MenuItemsPage;
  let fixture: ComponentFixture<MenuItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddMailComponent } from './order-add-mail.component';

describe('OrderAddMailComponent', () => {
  let component: OrderAddMailComponent;
  let fixture: ComponentFixture<OrderAddMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAddMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

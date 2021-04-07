import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkaddsessionsComponent } from './bulkaddsessions.component';

describe('BulkaddsessionsComponent', () => {
  let component: BulkaddsessionsComponent;
  let fixture: ComponentFixture<BulkaddsessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkaddsessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkaddsessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

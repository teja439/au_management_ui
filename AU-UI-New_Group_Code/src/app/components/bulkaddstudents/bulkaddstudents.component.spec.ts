import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkaddstudentsComponent } from './bulkaddstudents.component';

describe('BulkaddstudentsComponent', () => {
  let component: BulkaddstudentsComponent;
  let fixture: ComponentFixture<BulkaddstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkaddstudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkaddstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

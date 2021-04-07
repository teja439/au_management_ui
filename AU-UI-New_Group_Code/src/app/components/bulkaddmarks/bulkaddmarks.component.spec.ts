import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkaddmarksComponent } from './bulkaddmarks.component';

describe('BulkaddmarksComponent', () => {
  let component: BulkaddmarksComponent;
  let fixture: ComponentFixture<BulkaddmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkaddmarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkaddmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

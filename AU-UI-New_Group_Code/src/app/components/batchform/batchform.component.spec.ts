import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchformComponent } from './batchform.component';

describe('BatchformComponent', () => {
  let component: BatchformComponent;
  let fixture: ComponentFixture<BatchformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

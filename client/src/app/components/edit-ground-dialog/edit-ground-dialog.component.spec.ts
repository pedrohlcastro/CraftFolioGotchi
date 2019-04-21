import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroundDialogComponent } from './edit-ground-dialog.component';

describe('EditGroundDialogComponent', () => {
  let component: EditGroundDialogComponent;
  let fixture: ComponentFixture<EditGroundDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroundDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBackgroudDialogComponent } from './edit-backgroud-dialog.component';

describe('EditBackgroudDialogComponent', () => {
  let component: EditBackgroudDialogComponent;
  let fixture: ComponentFixture<EditBackgroudDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBackgroudDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBackgroudDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

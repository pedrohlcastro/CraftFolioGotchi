import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImgOrVideoDialogComponent } from './edit-img-or-video-dialog.component';

describe('EditImgOrVideoDialogComponent', () => {
  let component: EditImgOrVideoDialogComponent;
  let fixture: ComponentFixture<EditImgOrVideoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImgOrVideoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImgOrVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

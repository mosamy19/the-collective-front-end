import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUploaderComponent } from './profile-uploader.component';

describe('ProfileUploaderComponent', () => {
  let component: ProfileUploaderComponent;
  let fixture: ComponentFixture<ProfileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

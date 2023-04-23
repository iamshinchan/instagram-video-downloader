import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramVideoDownloadComponent } from './instagram-video-download.component';

describe('InstagramVideoDownloadComponent', () => {
  let component: InstagramVideoDownloadComponent;
  let fixture: ComponentFixture<InstagramVideoDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstagramVideoDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramVideoDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

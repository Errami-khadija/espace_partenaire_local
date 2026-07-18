import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementPreview } from './announcement-preview';

describe('AnnouncementPreview', () => {
  let component: AnnouncementPreview;
  let fixture: ComponentFixture<AnnouncementPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnouncementPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

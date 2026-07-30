import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementTable } from './announcement-table';

describe('AnnouncementTable', () => {
  let component: AnnouncementTable;
  let fixture: ComponentFixture<AnnouncementTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementTable],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnouncementTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, beforeAll, vi } from 'vitest';

import { Announcements } from '../announcements/announcements';
import { AnnouncementService } from '../app/services/announcement';
import { Announcement } from '../app/models/announcement.model';

describe('Scénario - Cycle de vie des Annonces', () => {
  let announcementService: AnnouncementService;
  let httpMock: HttpTestingController;

  beforeAll(() => {
    if (!getTestBed().platform) {
      getTestBed().initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting()
      );
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        Announcements
      ],
      providers: [AnnouncementService]
    }).compileComponents();

    announcementService = TestBed.inject(AnnouncementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });

  it('Devrait exécuter le cycle complet: création (brouillon), soumission (validation), et publication', () => {
    const mockDraft: Announcement = {
      id: 1,
      title: 'Projet Innovant',
      description: 'Description du projet',
      type: 'investment',
      sector: 'Technologies',
      region: 'Paris',
      contact: 'contact@tech.fr',
      status: 'draft',
      views: 0
    };

    const mockPending: Announcement = { ...mockDraft, status: 'pending' };
    const mockPublished: Announcement = { ...mockDraft, status: 'published' };

    let currentAnnouncements: Announcement[] = [];
    vi.spyOn(announcementService, 'getAllAnnouncements').mockImplementation(() => of(currentAnnouncements));
    vi.spyOn(announcementService, 'createAnnouncement').mockReturnValue(of(mockDraft));
    vi.spyOn(announcementService, 'submitAnnouncement').mockReturnValue(of(mockPending));

    const fixture = TestBed.createComponent(Announcements);
    const component = fixture.componentInstance;
    
    fixture.detectChanges();

    component.openForm();
    expect(component.showForm).toBe(true);

    announcementService.createAnnouncement(mockDraft).subscribe();
    
    currentAnnouncements = [mockDraft];
    component.table.loadAnnouncements();
    fixture.detectChanges();

    let badges = fixture.debugElement.queryAll(By.css('.status-badge'));
    expect(badges.length).toBe(1);
    expect(badges[0].nativeElement.classList.contains('draft')).toBe(true);
    expect(badges[0].nativeElement.textContent.trim()).toBe('Brouillon');

    let editBtns = fixture.debugElement.queryAll(By.css('.edit-btn'));
    expect(editBtns.length).toBe(1);

    announcementService.submitAnnouncement(1).subscribe();

    currentAnnouncements = [mockPending];
    component.table.loadAnnouncements();
    fixture.detectChanges();

    badges = fixture.debugElement.queryAll(By.css('.status-badge'));
    expect(badges[0].nativeElement.classList.contains('pending')).toBe(true);
    expect(badges[0].nativeElement.textContent.trim()).toBe('En attente');

    currentAnnouncements = [mockPublished];
    component.table.loadAnnouncements();
    fixture.detectChanges();

    badges = fixture.debugElement.queryAll(By.css('.status-badge'));
    expect(badges[0].nativeElement.classList.contains('published')).toBe(true);
    expect(badges[0].nativeElement.textContent.trim()).toBe('Publiée');

    expect(announcementService.getAllAnnouncements).toHaveBeenCalledTimes(4);
    expect(announcementService.createAnnouncement).toHaveBeenCalledTimes(1);
    expect(announcementService.submitAnnouncement).toHaveBeenCalledTimes(1);
  });
});

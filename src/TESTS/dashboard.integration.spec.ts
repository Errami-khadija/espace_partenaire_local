import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, beforeAll, vi } from 'vitest';

import { Dashboard } from '../dashboard/dashboard';
import { DashboardService } from '../app/services/dashboard';

describe('Scénario - Dashboard', () => {
  let dashboardService: DashboardService;
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
        Dashboard
      ],
      providers: [DashboardService]
    }).compileComponents();

    dashboardService = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });

  it('1. Devrait voir le dashboard et charger les statistiques', () => {
    const fixture = TestBed.createComponent(Dashboard);
    const component = fixture.componentInstance;
    
    vi.spyOn(dashboardService, 'getDashboardStats').mockReturnValue(of({
      activeAnnouncements: 10,
      pendingAnnouncements: 5,
      monthlyLeads: 100,
      totalViews: 2000
    } as any));

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(dashboardService.getDashboardStats).toHaveBeenCalled();
  });
});

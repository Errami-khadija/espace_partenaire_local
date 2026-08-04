import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';

import { Statistics } from '../statistics/statistics';

describe('Scénario - Statistiques', () => {
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
        Statistics
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });

  it('Devrait voir les statistiques de la plateforme', () => {
    const fixture = TestBed.createComponent(Statistics);
    const component = fixture.componentInstance;

    fixture.detectChanges();
    
    const req = httpMock.expectOne('http://localhost:8080/api/local-partner/statistiques');
    expect(req.request.method).toBe('GET');
    req.flush({ kpi: {}, histogram: [], ranks: [], donut: [] });

    expect(component).toBeTruthy();
  });
});

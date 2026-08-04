import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, beforeAll, vi } from 'vitest';

import { Leads } from '../leads/leads';
import { LeadService } from '../app/services/lead';

describe('Scénario - Gestion des Leads', () => {
  let leadService: LeadService;
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
        Leads
      ],
      providers: [LeadService]
    }).compileComponents();

    leadService = TestBed.inject(LeadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });

  it('Devrait voir les leads et vérifier les interactions utilisateur', () => {
    const fixture = TestBed.createComponent(Leads);
    const component = fixture.componentInstance;
    
    vi.spyOn(leadService, 'getAllLeads').mockReturnValue(of([
      { id: 1, name: 'Lead 1', status: 'new' } as any
    ]));

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(leadService.getAllLeads).toHaveBeenCalled();
  });
});

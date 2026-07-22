import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiStats } from './kpi-stats';

describe('KpiStats', () => {
  let component: KpiStats;
  let fixture: ComponentFixture<KpiStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiStats],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not throw when requestAnimationFrame is unavailable', () => {
    const originalRequestAnimationFrame = globalThis.requestAnimationFrame;

    Object.defineProperty(globalThis, 'requestAnimationFrame', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    try {
      expect(() => fixture.detectChanges()).not.toThrow();
    } finally {
      Object.defineProperty(globalThis, 'requestAnimationFrame', {
        value: originalRequestAnimationFrame,
        configurable: true,
        writable: true,
      });
    }
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesVisibility } from './services-visibility';

describe('ServicesVisibility', () => {
  let component: ServicesVisibility;
  let fixture: ComponentFixture<ServicesVisibility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesVisibility],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesVisibility);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

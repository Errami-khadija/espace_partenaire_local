import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutPlot } from './donut-plot';

describe('DonutPlot', () => {
  let component: DonutPlot;
  let fixture: ComponentFixture<DonutPlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutPlot],
    }).compileComponents();

    fixture = TestBed.createComponent(DonutPlot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hitogram } from './hitogram';

describe('Hitogram', () => {
  let component: Hitogram;
  let fixture: ComponentFixture<Hitogram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hitogram],
    }).compileComponents();

    fixture = TestBed.createComponent(Hitogram);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

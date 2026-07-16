import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonProfile } from './mon-profile';

describe('MonProfile', () => {
  let component: MonProfile;
  let fixture: ComponentFixture<MonProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(MonProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

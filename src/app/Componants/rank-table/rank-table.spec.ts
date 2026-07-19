import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankTable } from './rank-table';

describe('RankTable', () => {
  let component: RankTable;
  let fixture: ComponentFixture<RankTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankTable],
    }).compileComponents();

    fixture = TestBed.createComponent(RankTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

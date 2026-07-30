import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Hitogram } from '../app/Componants/hitogram/hitogram';
import { RankTable } from '../app/Componants/rank-table/rank-table';
import { DonutPlot } from '../app/Componants/donut-plot/donut-plot';
import { KpiStats } from '../app/Componants/kpi-stats/kpi-stats';

import { StatisticsService } from '../app/services/statistics';
import { StatisticsResponse } from '../app/models/statistics.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    Hitogram,
    RankTable,
    DonutPlot,
    KpiStats
  ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class Statistics implements OnInit {

  statistics?: StatisticsResponse;

  constructor(private statisticsService: StatisticsService,  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe({
      next: (data: StatisticsResponse) => {
        this.statistics = data;
        console.log(this.statistics);
         this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
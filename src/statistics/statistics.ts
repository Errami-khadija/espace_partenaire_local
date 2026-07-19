import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hitogram } from '../app/Componants/hitogram/hitogram';
import { RankTable } from '../app/Componants/rank-table/rank-table';
import { DonutPlot } from '../app/Componants/donut-plot/donut-plot';
import { KpiStats } from '../app/Componants/kpi-stats/kpi-stats';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, Hitogram, RankTable, DonutPlot, KpiStats],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics {}

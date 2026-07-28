import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input,  OnChanges } from '@angular/core';
import { StatisticsResponse } from '../../models/statistics.model';

interface KpiItem {
  label: string;
  value: string;
  delta: string;
  tone: 'positive' | 'neutral';
}

@Component({
  selector: 'app-kpi-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-stats.html',
  styleUrl: './kpi-stats.css',
})
export class KpiStats implements AfterViewInit {

  @Input() statistics!: StatisticsResponse;
  @ViewChildren('animatedValue') private animatedValues!: QueryList<ElementRef<HTMLHeadingElement>>;

 protected stats: KpiItem[] = [];

  ngAfterViewInit(): void {
    if (typeof globalThis.requestAnimationFrame !== 'function') {
      this.setFinalValues();
      return;
    }

    this.animateValues();
  }

  private animateValues(): void {
    this.animatedValues.forEach((item, index) => {
      const target = this.stats[index]?.value;
      if (!target) {
        return;
      }

      const numericTarget = this.extractNumber(target);
      if (numericTarget === null) {
        return;
      }

      const duration = 900 + index * 150;
      const startTime = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(numericTarget * eased);
        item.nativeElement.textContent = this.formatValue(current, target);

        if (progress < 1) {
          globalThis.requestAnimationFrame(step);
        }
      };

      globalThis.requestAnimationFrame(step);
    });
  }

  private setFinalValues(): void {
    this.animatedValues.forEach((item, index) => {
      const target = this.stats[index]?.value;
      if (!target) {
        return;
      }

      item.nativeElement.textContent = target;
    });
  }

  private extractNumber(value: string): number | null {
    const match = value.replace(/,/g, '').match(/\d+/);
    return match ? Number(match[0]) : null;
  }

  private formatValue(current: number, target: string): string {
    if (target.includes('%')) {
      return `${current.toFixed(1)}%`;
    }

    return current.toLocaleString();
  }

  ngOnChanges(): void {

  if (!this.statistics) return;

  this.stats = [

    {
      label: 'Total views',
      value: this.statistics.totalViews.toLocaleString(),
      delta: `+${this.statistics.viewsGrowth}% vs last month`,
      tone: 'positive'
    },

    {
      label: 'Total leads',
      value: this.statistics.totalLeads.toLocaleString(),
      delta: `+${this.statistics.leadsGrowth}% vs last month`,
      tone: 'positive'
    }

  ];
}
}

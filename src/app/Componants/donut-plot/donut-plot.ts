import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Input } from '@angular/core';
import { StatisticsResponse } from '../../models/statistics.model';

declare const d3: any;

@Component({
  selector: 'app-donut-plot',
  standalone: true,
  templateUrl: './donut-plot.html',
  styleUrl: './donut-plot.css',
})
export class DonutPlot implements AfterViewInit, OnDestroy {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  @Input() statistics!: StatisticsResponse;

  protected conversionRateTarget = 0;
protected leadsTarget = 0;
protected viewsTarget = 0;

  protected conversionDisplay = 0;
  protected leadsDisplay = 0;
  protected viewsDisplay = 0;

  private animationFrameId?: number;
  private percentageLabel?: any;
  private resizeObserver?: ResizeObserver;
  private currentSize = 260;

  private getAnimationFrame(callback: FrameRequestCallback): number {
    if (typeof globalThis.requestAnimationFrame === 'function') {
      return globalThis.requestAnimationFrame(callback);
    }
    if (typeof globalThis.setTimeout === 'function') {
      return globalThis.setTimeout(() => callback(Date.now()), 16) as unknown as number;
    }
    return 0;
  }

  private cancelAnimationFrame(id: number): void {
    if (typeof globalThis.cancelAnimationFrame === 'function') {
      globalThis.cancelAnimationFrame(id);
      return;
    }
    if (typeof globalThis.clearTimeout === 'function') {
      globalThis.clearTimeout(id);
    }
  }

  ngAfterViewInit(): void {
    this.conversionRateTarget = this.statistics.conversionRate;
this.leadsTarget = this.statistics.conversionLeads;
this.viewsTarget = this.statistics.conversionViews;

    this.renderChart();
    this.startNumberAnimation();
    this.observeResize();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== undefined) {
      this.cancelAnimationFrame(this.animationFrameId);
    }
    this.resizeObserver?.disconnect();
  }

  private observeResize(): void {
    const wrapper = this.chartContainer.nativeElement.parentElement;
    if (!wrapper || typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const size = Math.max(40, Math.floor(Math.min(width, height)));

        if (Math.abs(size - this.currentSize) > 1) {
          this.currentSize = size;
          const el = this.chartContainer.nativeElement;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
        }
      }
    });

    this.resizeObserver.observe(wrapper);
  }

  private startNumberAnimation(): void {
    const duration = 1200;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      this.conversionDisplay = this.conversionRateTarget * eased;
      this.leadsDisplay = Math.round(this.leadsTarget * eased);
      this.viewsDisplay = Math.round(this.viewsTarget * eased);

      if (this.percentageLabel) {
        this.percentageLabel.text(`${this.conversionDisplay.toFixed(1)}%`);
      }

      if (progress < 1) {
        this.animationFrameId = this.getAnimationFrame(step);
      } else {
        this.conversionDisplay = this.conversionRateTarget;
        this.leadsDisplay = this.leadsTarget;
        this.viewsDisplay = this.viewsTarget;

        if (this.percentageLabel) {
          this.percentageLabel.text(`${this.conversionDisplay.toFixed(1)}%`);
        }
      }
    };

    this.animationFrameId = this.getAnimationFrame(step);
  }

  private renderChart(): void {
    const container = this.chartContainer.nativeElement;

    if (typeof d3 === 'undefined') {
      container.innerHTML = '<p class="chart-fallback">D3 is not available yet.</p>';
      return;
    }

    const width = 260;
    const height = 260;
    const radius = 100;
    const innerRadius = 70;

    d3.select(container).selectAll('*').remove();

    const svg = d3
      .select(container)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('role', 'img')
      .attr('aria-label', 'Donut chart showing lead conversion rate');

    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius).cornerRadius(8);
    const pie = d3.pie().value((value: number) => value).sort(null);

    const data = [this.conversionRateTarget, 100 - this.conversionRateTarget];
    const color = ['#4f46e5', '#e2e8f0'];

    const slices = g.selectAll('path').data(pie(data)).enter().append('path')
      .attr('fill', (_: unknown, index: number) => color[index])
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('d', (d: any) => arc({ startAngle: d.startAngle, endAngle: d.startAngle }) as any);

    try {
      slices.transition()
        .delay((_: any, i: number) => i * 120)
        .duration(900)
        .ease((d3 as any).easeCubicOut)
        .attrTween('d', (d: any) => {
          const start = { startAngle: d.startAngle, endAngle: d.startAngle };
          const interpolate = (d3 as any).interpolate(start, d);
          return (t: number) => arc(interpolate(t)) as any;
        });
    } catch (e) {
      slices.attr('d', arc as any);
    }

    this.percentageLabel = g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .style('font-size', '28px')
      .style('font-weight', '700')
      .style('fill', '#0f172a')
      .text(`${this.conversionDisplay.toFixed(1)}%`);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .style('font-size', '13px')
      .style('fill', '#64748b')
      .text('views → leads');

    if (typeof globalThis.requestAnimationFrame === 'function') {
      this.getAnimationFrame(() => container.classList.add('is-visible'));
    } else {
      container.classList.add('is-visible');
    }
  }
}
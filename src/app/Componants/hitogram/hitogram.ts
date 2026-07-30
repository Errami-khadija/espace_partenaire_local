import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { DailyView } from '../../models/statistics.model';

declare const d3: any;

interface DailyViews {
  day: string;
  views: number;
}

@Component({
  selector: 'app-hitogram',
  standalone: true,
  templateUrl: './hitogram.html',
  styleUrl: './hitogram.css',
})
export class Hitogram implements AfterViewInit, OnChanges {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  @Input() dailyViews: DailyView[] = [];

protected data: DailyViews[] = [];

 ngAfterViewInit(): void {

  if (this.data.length > 0) {
    this.renderChart();
  }

}

  ngOnChanges(changes: SimpleChanges): void {

  if (changes['dailyViews'] && this.dailyViews.length > 0) {

    this.data = this.dailyViews.map(item => ({
      day: item.day,
      views: item.views
    }));

    if (this.chartContainer) {
      this.renderChart();
    }

  }

}

  private renderChart(): void {
    const container = this.chartContainer.nativeElement;

    if (typeof d3 === 'undefined') {
      container.innerHTML = '<p class="chart-fallback">D3 is not available yet.</p>';
      return;
    }

    const width = 760;
    const height = 320;
    const margin = { top: 20, right: 24, bottom: 40, left: 48 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.select(container).selectAll('*').remove();

    const svg = d3
      .select(container)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('role', 'img')
      .attr('aria-label', 'Histogram of 30-day page views')
      .style('width', '100%')
      .style('height', 'auto');

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(this.data.map((item) => item.day))
      .range([0, innerWidth])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (item: DailyViews) => item.views)!])
      .nice()
      .range([innerHeight, 0]);

    const radius = 7;

    g.selectAll('path')
      .data(this.data)
      .enter()
      .append('path')
      .attr('d', (item: DailyViews) => {
        const barX = x(item.day) ?? 0;
        const barWidth = x.bandwidth();
        const barY = innerHeight;
        const barHeight = 0;
        const topY = barY - barHeight;

        return [
          `M ${barX + radius} ${topY}`,
          `L ${barX + barWidth - radius} ${topY}`,
          `Q ${barX + barWidth} ${topY} ${barX + barWidth} ${topY + radius}`,
          `L ${barX + barWidth} ${barY}`,
          `L ${barX} ${barY}`,
          `L ${barX} ${topY + radius}`,
          `Q ${barX} ${topY} ${barX + radius} ${topY}`,
          'Z',
        ].join(' ');
      })
      .attr('fill', '#4f46e5')
      .attr('opacity', 0.15)
      .attr('stroke', '#4338ca')
      .attr('stroke-width', 0.7)
      .style('shape-rendering', 'crispEdges')
      .transition()
      .duration(1000)
      .ease(d3.easeCubicOut)
      .attr('d', (item: DailyViews) => {
        const barX = x(item.day) ?? 0;
        const barWidth = x.bandwidth();
        const barY = y(item.views);
        const barHeight = innerHeight - y(item.views);
        const topY = barY;

        return [
          `M ${barX + radius} ${topY}`,
          `L ${barX + barWidth - radius} ${topY}`,
          `Q ${barX + barWidth} ${topY} ${barX + barWidth} ${topY + radius}`,
          `L ${barX + barWidth} ${barY + barHeight}`,
          `L ${barX} ${barY + barHeight}`,
          `L ${barX} ${topY + radius}`,
          `Q ${barX} ${topY} ${barX + radius} ${topY}`,
          'Z',
        ].join(' ');
      })
      .attr('opacity', 0.95);

    g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x).tickSize(0));

    g.append('g').call(d3.axisLeft(y).ticks(5).tickSize(0));

    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 34)
      .attr('text-anchor', 'middle')
      .attr('fill', '#64748b')
      .style('font-size', '12px')
      .text('Days');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -36)
      .attr('text-anchor', 'middle')
      .attr('fill', '#64748b')
      .style('font-size', '12px')
      .text('Views');
  }
}

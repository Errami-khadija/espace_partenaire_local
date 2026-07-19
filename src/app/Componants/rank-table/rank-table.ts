import { Component, OnDestroy, OnInit, AfterViewInit, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

interface AnnouncementStat {
  name: string;
  leads: number;
  views: number;
}

@Component({
  selector: 'app-rank-table',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './rank-table.html',
  styleUrl: './rank-table.css',
})
export class RankTable implements OnInit, AfterViewInit, OnDestroy {
  protected readonly rows: AnnouncementStat[] = [
    { name: 'Nouvelle offre premium', leads: 84, views: 12840 },
    { name: 'Session découverte locale', leads: 71, views: 11620 },
    { name: 'Service de soutien expert', leads: 63, views: 10490 },
    { name: 'Formation digitale', leads: 57, views: 9830 },
    { name: 'Pack accompagnement', leads: 49, views: 9120 },
    { name: 'Aide juridique rapide', leads: 46, views: 8750 },
    { name: 'Visite guidée du quartier', leads: 39, views: 8210 },
    { name: 'Offre famille du mois', leads: 35, views: 7680 },
    { name: 'Atelier numérique', leads: 31, views: 7120 },
    { name: 'Programme citoyen', leads: 28, views: 6540 },
  ];

  protected readonly sortedRows = [...this.rows].sort((a, b) => b.views - a.views);

  // Signals guarantee UI updates fire even outside Zone.js's patched APIs
  protected readonly animatedLeads = signal<number[]>(this.sortedRows.map(() => 0));
  protected readonly animatedViews = signal<number[]>(this.sortedRows.map(() => 0));

  private timeoutIds: ReturnType<typeof setTimeout>[] = [];
  private animationFrameIds: number[] = [];

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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sortedRows.forEach((row, index) => {
      this.timeoutIds.push(
        globalThis.setTimeout(() => {
          this.startRowAnimation(index, row);
        }, index * 70)
      );
    });
  }

  ngOnDestroy(): void {
    this.timeoutIds.forEach((id) => globalThis.clearTimeout(id));
    this.animationFrameIds.forEach((id) => this.cancelAnimationFrame(id));
  }

  private startRowAnimation(index: number, row: AnnouncementStat): void {
    const duration = 900;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      this.animatedLeads.update((arr) => {
        const next = [...arr];
        next[index] = Math.round(row.leads * eased);
        return next;
      });
      this.animatedViews.update((arr) => {
        const next = [...arr];
        next[index] = Math.round(row.views * eased);
        return next;
      });

      if (progress < 1) {
        this.animationFrameIds.push(this.getAnimationFrame(step));
      } else {
        this.animatedLeads.update((arr) => {
          const next = [...arr];
          next[index] = row.leads;
          return next;
        });
        this.animatedViews.update((arr) => {
          const next = [...arr];
          next[index] = row.views;
          return next;
        });
      }
    };

    this.animationFrameIds.push(this.getAnimationFrame(step));
  }
}
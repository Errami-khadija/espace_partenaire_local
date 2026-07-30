import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from './components/stat-card/stat-card';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { DashboardStats } from '../app/models/dashboard-stats';
import { DashboardService } from '../app/services/dashboard';


@Component({
  selector: 'app-dashboard',
  imports: [
  CommonModule,
  StatCard,
  RouterModule
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
 stats: any[] = [];

constructor(private dashboardService: DashboardService, private router: Router,  private cdr: ChangeDetectorRef) {}

ngOnInit(): void {
  this.dashboardService.getDashboardStats().subscribe({
   next: (data) => {
  this.stats = [
    {
      title: 'Annonces actives',
      value: data.activeAnnouncements,
      icon: 'campaign',
      color: '#2563eb'
    },
    {
      title: 'En attente',
      value: data.pendingAnnouncements,
      icon: 'schedule',
      color: '#f59e0b'
    },
    {
      title: 'Leads ce mois',
      value: data.monthlyLeads,
      icon: 'groups',
      color: '#10b981'
    },
    {
      title: 'Vues totales',
      value: data.totalViews,
      icon: 'visibility',
      color: '#8b5cf6'
    }
  ];
   this.cdr.detectChanges();
},
    error: (err) => console.error(err)
  });
}


  // Method for programmatic navigation
  goToProfile(): void {
    this.router.navigate(['/mon-profile']);
  }
}

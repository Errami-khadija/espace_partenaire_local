import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from './components/stat-card/stat-card';
import { Router, RouterModule } from '@angular/router';


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

  stats = [

  {
    title: 'Annonces publiées',
    value: 12,
    icon: 'campaign',
    color: '#2E7D32'
  },

  {
    title: 'En attente',
    value: 4,
    icon: 'schedule',
    color: '#FB8C00'
  },

  {
    title: 'Leads ce mois',
    value: 28,
    icon: 'groups',
    color: '#1976D2'
  },

  {
    title: 'Vues totales',
    value: 1532,
    icon: 'visibility',
    color: '#8E24AA'
  }

];

constructor(private router: Router) {} 

  // Method for programmatic navigation
  goToProfile(): void {
    this.router.navigate(['/mon-profile']);
  }
}

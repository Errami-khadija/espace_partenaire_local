import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  LucideHouse,
  LucideBell,
  LucideBuilding2,
  LucideChartColumn,
  LucideChevronsLeft,
  LucideChevronsRight,
  LucideHeadphones,
  LucideLogOut,
  LucideMonitor,
  LucideUserRound,
} from '@lucide/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: 'home' | 'bell' | 'building' | 'chart' | 'monitor' | 'user' | 'logout';
}

@Component({
  selector: 'app-side-bare',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LucideHouse,
    LucideBell,
    LucideBuilding2,
    LucideChartColumn,
    LucideChevronsLeft,
    LucideChevronsRight,
    LucideHeadphones,
    LucideLogOut,
    LucideMonitor,
    LucideUserRound,
  ],
  templateUrl: './side-bare.html',
  styleUrl: './side-bare.css',
})
export class SidebarComponent {
  collapsed = false;

  items: NavItem[] = [
    { label: 'Tableau de bord', path: '/dashboard', icon: 'home' },
    { label: 'Annonces', path: '/announcements', icon: 'bell' },
    { label: 'Leads', path: '/leads', icon: 'building' },
    { label: 'Statistiques', path: '/statistics', icon: 'chart' },
    { label: 'Services Visibilité', path: '/services-visibility', icon: 'monitor' },
    { label: 'Mon Profile', path: '/mon-profile', icon: 'user' },
    { label: 'Déconnexion', path: '/', icon: 'logout' },
  ];

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
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
  icon: 'bell' | 'building' | 'chart' | 'monitor' | 'user' | 'logout';
}

@Component({
  selector: 'app-side-bare',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
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
    { label: 'Announcements', path: '/announcements', icon: 'bell' },
    { label: 'Leads', path: '/leads', icon: 'building' },
    { label: 'Statistics', path: '/statistics', icon: 'chart' },
    { label: 'Services Visibility', path: '/services-visibility', icon: 'monitor' },
    { label: 'Mon Profile', path: '/mon-profile', icon: 'user' },
    { label: 'Déconnexion', path: '/deconnexion', icon: 'logout' },
  ];

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}

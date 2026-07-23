import { Routes } from '@angular/router';
import { Dashboard } from '../dashboard/dashboard';
import { Announcements } from '../announcements/announcements';
import { Leads } from '../leads/leads';
import { Statistics } from '../statistics/statistics';
import { ServicesVisibility } from '../services-visibility/services-visibility';
import { MonProfile } from '../mon-profile/mon-profile';
import { Deconnexion } from '../deconnexion/deconnexion';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard, data: { title: 'Tableau de bord' } },
  { path: 'announcements', component: Announcements, data: { title: 'Announcements' } },
  { path: 'leads', component: Leads, data: { title: 'Leads' } },
  { path: 'statistics', component: Statistics, data: { title: 'Statistics' } },
  { path: 'services-visibility', component: ServicesVisibility, data: { title: 'Services Visibility' } },
  { path: 'mon-profile', component: MonProfile, data: { title: 'Mon Profile' } },
  { path: 'deconnexion', component: Deconnexion, data: { title: 'Déconnexion' } },
];
